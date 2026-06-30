import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-auth-sign-in',
  imports: [FormsModule, InputTextModule, ButtonModule, CheckboxModule, PasswordModule, DividerModule],
  templateUrl: './auth-sign-in.html',
  styleUrl: './auth-sign-in.scss',
})
export class AuthSignIn {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  remember = signal(false);
  loading = signal(false);
  error = signal('');

  submit(): void {
    this.error.set('');
    this.loading.set(true);
    this.auth.login(this.username(), this.password()).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.error.set('Invalid username or password.');
        this.loading.set(false);
      },
    });
  }
}
