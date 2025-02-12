import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

export interface LoginUser {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, RouterModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(public authService: AuthService, private router: Router, private toastService: ToastService, private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormControl(true)
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        if (this.loginForm.value.rememberMe) {
          console.log(data.access_token)
          localStorage.setItem('authToken', data.access_token);
        }
        this.authService.userLoggedIn = true;
        this.toastService.emitToast({ severity: 'success', summary: 'Success', detail: 'Loggedin successfully.', life: 3000 });
        this.authService.getUserStatus().subscribe((data) => {
          this.authService.userDetails = data;
        }, (error) => {
          if (error.error.message === "Unauthorized") {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.removeItem('authToken');
            }
            this.router.navigate(['/login'])
            this.authService.userLoggedIn = false;
          }
        });
        this.router.navigate(['dashboard']);
      }, error => {
        console.error(error);
        this.toastService.emitToast({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 })
      })
    } else {
      this.markFormGroupTouched(this.loginForm);
      console.log(this.loginForm, 'this.loginForm')
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  signinWithGoogle() {
    window.location.href = 'http://localhost:3000/api/auth/google/login';
  }
}
