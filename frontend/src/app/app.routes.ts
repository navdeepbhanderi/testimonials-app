import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    }, {
        path: 'login',
        component: LoginComponent,
        title: 'Login page'
    }, {
        path: 'signup',
        component: SignupComponent,
        title: 'Signup page'
    }
];
