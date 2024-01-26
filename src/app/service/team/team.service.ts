import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../../models/team";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('http://localhost:8080/api/v1/team/get/all');
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>('http://localhost:8080/api/v1/team/get/' + id);
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>('http://localhost:8080/api/v1/team/register', team);
  }
}
