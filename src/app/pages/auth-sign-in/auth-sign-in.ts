import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-auth-sign-in',
  imports: [FormsModule, RouterLink, InputTextModule, ButtonModule, CheckboxModule, PasswordModule, DividerModule],
  templateUrl: './auth-sign-in.html',
  styleUrl: './auth-sign-in.scss'
})
export class AuthSignIn {
  email = signal('');
  password = signal('');
  remember = signal(false);
}
