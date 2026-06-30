import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./pages/auth-sign-in/auth-sign-in').then(m => m.AuthSignIn),
      },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'reporting',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/reporting/reporting').then(m => m.Reporting),
  },
  {
    path: 'ip-profile',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/ip-profile/ip-profile').then(m => m.IpProfile),
  },
  { path: '**', redirectTo: 'dashboard' },
];
