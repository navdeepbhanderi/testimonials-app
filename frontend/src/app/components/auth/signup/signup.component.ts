import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormGroup ,FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

export interface RegisterUser {
  name: string,
  email: string,
  password: string
}

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, RouterModule],
  providers: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
      cpassword: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    });
  }

  signup() {
    console.log(this.signUpForm.value)
    this.authService.registerUser({
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }).subscribe((data: any) => {
      console.log(data)
      this.toastService.emitToast({ severity: 'success', summary: 'Success', detail: data?.message, life: 3000 });
      this.signUpForm.reset();
    }, error => {
      console.error(error.error)
      this.toastService.emitToast({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
    })
  }
}
