import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'reporting',
    loadComponent: () => import('./pages/reporting/reporting').then(m => m.Reporting),
  },
  {
    path: 'ip-profile',
    loadComponent: () => import('./pages/ip-profile/ip-profile').then(m => m.IpProfile),
  },
];
