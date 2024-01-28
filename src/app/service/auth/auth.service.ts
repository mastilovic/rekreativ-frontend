import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import {TokenStorageService} from "../tokenstorage/token-storage.service";

const AUTH_API = 'http://localhost:8080/api/v1/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private user: User = {
  //   "username":"admin",
  //   "password":"admin"
  // };

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  login(user: any): Observable<any> {
    console.log("inside login method in authService");
    return this.http.post(AUTH_API + "/login", user, {observe: 'response'});
  }

  register(user: any): Observable<any> {
    console.log("inside register method in authService");
    return this.http.post(AUTH_API + "/register", user, {observe: 'response'});
  }

  onLoginSuccess(token: string, username: string) {
    this.tokenStorageService.saveToken(token);
    this.tokenStorageService.saveUser(username);
  }
  onLoginUnsuccess() {
    this.tokenStorageService.removeTokenAndUser();
  }
}
