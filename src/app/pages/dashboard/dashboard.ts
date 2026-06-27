import { Component } from '@angular/core';
import { Dashboard as DashboardComponent } from '../../features/dashboard/components/dashboard/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
