import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MessageService } from 'primeng/api';
import { ToastService } from './services/toast.service';
import { ToastModule } from 'primeng/toast';
import { ToastType } from './common/interfaces/interfaces';
import { AuthService } from './services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private router: Router, private route: ActivatedRoute, private primeng: PrimeNG, private messageService: MessageService, private readonly toastService: ToastService, public authService: AuthService, @Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit(): void {
    console.log('App')
    this.route.queryParams.subscribe((data) => {
      const token = data['token'];
      if (token) {
        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true
        });
      }
    })
    setTimeout(() => {
      this.authService.getUserStatus().subscribe((data) => {
        this.authService.userDetails = data;
        console.log(this.authService.userDetails, 'userDetails')
      }, (error) => {
        if (error.error.message === "Unauthorized") {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('authToken');
          }
          this.router.navigate(['/login'])
          this.authService.userLoggedIn = false;
        }
      });
      if (isPlatformBrowser(this.platformId)) {
        this.authService.userLoggedIn = !!localStorage.getItem('authToken');
      }
    });
    this.primeng.ripple.set(true);
    this.toastService.showToast.subscribe((value: ToastType) => {
      this.messageService.add(value);
    })
  }
}
