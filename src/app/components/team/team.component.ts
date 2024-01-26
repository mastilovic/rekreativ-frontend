import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from "../../service/team/team.service";
import {Subscription} from "rxjs";
import {Team} from "../../models/team";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

  teams: Team[];
  sub: Subscription = new Subscription();

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTeams(): void {
    this.sub = this.teamService.getTeams().subscribe({
      next: res => this.teams = res,
      error: err => console.error(err),
      complete: () => console.log("Completed getting teams")
    });
  }
}
