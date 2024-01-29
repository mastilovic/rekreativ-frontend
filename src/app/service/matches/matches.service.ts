import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../../models/match";

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor(private http: HttpClient) { }

  getMatches(): Observable<Match[]> {
    return this.http.get<any>('http://localhost:8080/api/v1/matches/get/all');
  }
}
