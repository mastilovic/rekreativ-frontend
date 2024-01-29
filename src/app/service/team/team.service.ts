import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../../models/team";
import {TeamCreateDTO} from "../../models/TeamCreateDTO";
import {TeammateToTeamDTO} from "../../models/TeammateToTeamDTO";

const TEAM_URL = 'http://localhost:8080/api/v1/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(TEAM_URL + '/get/all');
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(TEAM_URL + '/get/' + id);
  }

  createTeam(team: TeamCreateDTO): Observable<TeamCreateDTO> {
    return this.http.post<TeamCreateDTO>(TEAM_URL + '/register', team);
  }

  addTeammateToTeam(toTeamDTO: TeammateToTeamDTO): Observable<TeammateToTeamDTO> {
    return this.http.post<TeammateToTeamDTO>(TEAM_URL + '/add/teammate', toTeamDTO);
  }
}
