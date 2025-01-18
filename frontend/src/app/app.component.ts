import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MessageService } from 'primeng/api';
import { ToastService } from './services/toast.service';
import { ToastModule } from 'primeng/toast';
import { ToastType } from './common/interfaces/interfaces';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private primeng: PrimeNG, private messageService: MessageService, private readonly toastService: ToastService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userLoggedIn = !!localStorage.getItem('authToken');
    this.primeng.ripple.set(true);
    this.toastService.showToast.subscribe((value: ToastType) => {
      this.messageService.add(value);
    })
  }
}
