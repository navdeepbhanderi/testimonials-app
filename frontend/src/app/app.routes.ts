import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './common/guards/auth.guard';
import { LoginGuard } from './common/guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'login',
        canActivate: [LoginGuard],
        component: LoginComponent,
        title: 'Login page'
    }, {
        path: 'signup',
        canActivate: [LoginGuard],
        component: SignupComponent,
        title: 'Signup page'
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
        title: 'Dashboard page'
    }
];
