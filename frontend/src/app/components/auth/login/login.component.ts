import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    });
  }
  
  login() {
    this.authService.login(this.loginForm.value).subscribe((data: any) => {
      localStorage.setItem('authToken', data.access_token)
      this.toastService.emitToast({ severity: 'success', summary: 'Success', detail: 'Loggedin successfully.', life: 3000 })
      this.router.navigate(['dashboard']);
    }, error => {
      console.error(error);
      this.toastService.emitToast({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 })
    })
  }

  signinWithGoogle() {
    this.authService.signinWithGoogle().subscribe();
  }
}
