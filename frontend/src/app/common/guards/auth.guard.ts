import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService){};
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        let isLoggedIn = this.authService.userLoggedIn;
        if (isLoggedIn){
            return true
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}