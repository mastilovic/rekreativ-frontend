import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Teammate} from "../../models/teammate";

@Injectable({
  providedIn: 'root'
})
export class TeammateService {

  constructor(private http: HttpClient) {
  }

  getTeammates(): Observable<Teammate[]> {
    return this.http.get<any>('http://localhost:8080/api/v1/teammate/get/all');
  }

  createTeammate(teammate: Teammate): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/v1/teammate/register', teammate);
  }

  findByName(name: string): Observable<Teammate> {
    return this.http.get<Teammate>('http://localhost:8080/api/v1/teammate?name=' + name)
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/v1/teammate/delete/' + id);
  }
}
