import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {TeamService} from "../../service/team/team.service";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";
import {TeamCreateDTO} from "../../models/TeamCreateDTO";
import {TeammateToTeamDTO} from "../../models/TeammateToTeamDTO";

@Component({
  selector: 'app-teammate-to-team',
  templateUrl: './teammate-to-team.component.html',
  styleUrls: ['./teammate-to-team.component.css']
})
export class TeammateToTeamComponent implements OnInit, OnDestroy {

  addForm: FormGroup;
  sub: Subscription = new Subscription();
  isUserLoggedIn: boolean = false;

  constructor(private teamService: TeamService,
              formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService) {
    this.addForm = formBuilder.group({
      teamName: [''],
      teamMate: ['']
    })
  }
  ngOnInit(): void {
    console.log("ngOnInit create team component")
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
    this.tokenStorageService.handleUnauthorizedAccess();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log("create team component destroyed")
  }

  create() {
    const team = this.buildTeammateToTeam();
    this.sub = this.teamService.addTeammateToTeam(team)
      .subscribe({
        next: res => console.log(res),
        error: err => console.error(err),
        complete: () => console.log("Create completed in CreateTeammateComponent!")
      })
  }

  private buildTeammateToTeam(): TeammateToTeamDTO {
    const teamName = this.addForm.value.teamName;
    const teamMate = this.addForm.value.teamMate;

    return {
      teamName: teamName,
      teamMate: teamMate
    };
  }

}
