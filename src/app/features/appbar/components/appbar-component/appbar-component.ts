import { Component, inject, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-appbar-component',
  imports: [ToolbarModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './appbar-component.html',
  styleUrl: './appbar-component.scss',
})
export class AppbarComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  @ViewChild('userMenu') userMenu!: Menu;

  menuItems = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.auth.logout(),
    },
  ];

  onReporting() {
    this.router.navigate(['reporting']);
  }

  onDashboard() {
    this.router.navigate(['dashboard']);
  }

  onIpList() {
    this.router.navigate(['ip-list']);
  }

  toggleUserMenu(event: Event) {
    this.userMenu.toggle(event);
  }
}
