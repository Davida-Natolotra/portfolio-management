import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { Router } from '@angular/router';

@Component({
  selector: 'app-appbar-component',
  imports: [ToolbarModule, AvatarModule, ButtonModule],
  templateUrl: './appbar-component.html',
  styleUrl: './appbar-component.scss',
})
export class AppbarComponent {
  router = inject(Router);

  onReporting() {
    this.router.navigate(['reporting']);
  }

  onDashboard() {
    this.router.navigate(['dashboard']);
  }
}
