import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  public static TOKEN_KEY = 'token';

  constructor(private jwtHelper: JwtHelperService) {

  }

  public getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
  }

  public logOut() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    try {
      return token != null && token && !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }
}
