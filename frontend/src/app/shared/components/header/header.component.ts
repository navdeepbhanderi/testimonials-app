import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonModule, RouterModule, MenuModule, ToastModule, Menu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false
  items!: MenuItem[];

  constructor(public authService: AuthService){
    this.userLoggedIn = authService.userLoggedIn;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                command: () => {
                }
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                  this.logout();
                }
            }
        ]
    }
  ];

  console.log(this.authService.userDetails)
  }

  public logout() {
    this.authService.logout();
  }

  public profileError() {
    this.authService.userDetails.profilePicture = null;
    console.log(this.authService.userDetails, 'userDetails')
  }
}
