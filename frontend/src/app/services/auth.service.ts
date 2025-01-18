import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterUser } from "../components/auth/signup/signup.component";
import { LoginUser } from "../components/auth/login/login.component";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userLoggedIn = false;

    constructor(private http: HttpClient, private router: Router) {}

    registerUser(payload: RegisterUser) {
        return this.http.post('http://localhost:3000/api/auth/signup' ,payload);
    }

    login(payload: LoginUser) {
        return this.http.post('http://localhost:3000/api/auth/login', payload);
    }

    signinWithGoogle() {
        return this.http.get('http://localhost:3000/api/auth/google/login')
    }

    logout() {
        // localStorage.removeItem('authToken');
        this.router.navigate(['login'])
    }
}