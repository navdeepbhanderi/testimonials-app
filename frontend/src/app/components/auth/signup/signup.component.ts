import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
  showPassword = false;
  showCPassword = false;

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      cpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {
      validators: [this.passwordMatchValidator('password', 'cpassword')]
    });
  }

  signup() {
    if (this.signUpForm.valid) {
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
    } else {
      this.markFormGroupTouched(this.signUpForm);
      console.log(this.signUpForm)
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

  passwordMatchValidator(passwordField: string, confirmPasswordField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordField)?.value;
      const confirmPassword = formGroup.get(confirmPasswordField)?.value;
      console.log(password, confirmPassword, 'password')
      if (password !== confirmPassword) {
        formGroup.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else if (!password && !confirmPassword) {
        formGroup.get(confirmPasswordField)?.setErrors({ required: true });
        return { required: true };
      } else {
        formGroup.get(confirmPasswordField)?.setErrors(null);
        return null;
      }
    }
  }

  signupWithGoogle() {
    window.location.href = 'http://localhost:3000/api/auth/google/login';
  }
}
