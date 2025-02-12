import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: object){};
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        const url = state.url;
        const token = this.getTokenFromUrl(url);
        if (token) {
            this.authService.userLoggedIn = true;
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('authToken', token);
            }
        }

        let isLoggedIn = this.authService.userLoggedIn;
        if (isLoggedIn){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }


  private getTokenFromUrl(url: string): string | null {
    const tokenMatch = url.match(/token=([^&]*)/);
    return tokenMatch ? tokenMatch[1] : null;
  }
}