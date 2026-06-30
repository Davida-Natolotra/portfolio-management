import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface TokenResponse {
  access: string;
  refresh: string;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(username: string, password: string) {
    return this.http
      .post<TokenResponse>(environment.tokenUrl, { username, password })
      .pipe(tap(({ access, refresh }) => this.setTokens(access, refresh)));
  }

  refreshToken() {
    const refresh = this.getRefreshToken();
    return this.http
      .post<{ access: string }>(environment.tokenUrl + 'refresh/', { refresh: refresh })
      .pipe(tap(({ access }) => localStorage.setItem(ACCESS_TOKEN_KEY, access)));
  }

  logout(): void {
    this.clearTokens();
    this.router.navigate(['/auth/sign-in']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
