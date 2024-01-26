import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { TokenStorageService } from '../tokenstorage/token-storage.service';
import { Observable } from 'rxjs';

const USERS_API = 'http://localhost:8080/api/v1/users/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API, httpOptions);
  }

}
