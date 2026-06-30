import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { routes } from './app.routes';

const BluePreset = definePreset(Material, {
  semantic: {
    primary: {
      50:  '#f2f4f6',
      100: '#d9dee4',
      200: '#b3bdc8',
      300: '#8090a3',
      400: '#4c647e',
      500: '#002147',
      600: '#001a39',
      700: '#00142b',
      800: '#000d1c',
      900: '#000b1a',
      950: '#000509',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    providePrimeNG({
      theme: {
        preset: BluePreset,
        options: { darkModeSelector: '.p-dark' },
      },
    }),
  ],
};
