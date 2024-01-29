import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router) { }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    // sessionStorage.removeItem(TOKEN_KEY)
    // sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
    // return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // sessionStorage.removeItem(USER_KEY);
    // sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY) as any);
    // return JSON.parse(sessionStorage.getItem(USER_KEY) as any);
  }

  public removeTokenAndUser(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    // sessionStorage.removeItem(TOKEN_KEY);
    // sessionStorage.removeItem(USER_KEY);
  }

  public getIsUserLogged(): boolean {
    if(this.getToken() !== null) {
      return true;
    }
    return false;
  }

  handleUnauthorizedAccess() {
    if(!this.getIsUserLogged()) {
      this.removeTokenAndUser();
      this.router.navigate([''])
          .then(() => window.location.reload())
    }
  }
}
