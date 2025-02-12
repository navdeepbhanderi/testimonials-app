import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { RegisterUser } from "../components/auth/signup/signup.component";
import { LoginUser } from "../components/auth/login/login.component";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userLoggedIn = false;
    userDetails: any;

    constructor(private http: HttpClient, private router: Router,  @Inject(PLATFORM_ID) private platformId: object) {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('authToken')) {
                this.userLoggedIn = true;
            }
          }
    }

    getUserStatus() {
        return this.http.get('http://localhost:3000/api/auth/status');
    }

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
        localStorage.removeItem('authToken');
        this.router.navigate(['login']);
        this.userLoggedIn = false;
    }
}