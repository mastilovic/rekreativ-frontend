import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";
import {TeamCreateDTO} from "../../models/TeamCreateDTO";
import {TeamService} from "../../service/team/team.service";

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {

  createForm: FormGroup;
  sub: Subscription = new Subscription();
  isUserLoggedIn: boolean = false;

  constructor(private teamService: TeamService,
              formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService) {
    this.createForm = formBuilder.group({
      teamName: [''],
      city: ['']
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
    const team = this.buildTeam();
    this.sub = this.teamService.createTeam(team)
      .subscribe({
        next: res => console.log(res),
        error: err => console.error(err),
        complete: () => console.log("Create completed in CreateTeammateComponent!")
      })
  }

  private buildTeam(): TeamCreateDTO {
    const teamName = this.createForm.value.teamName;
    const city = this.createForm.value.city;

    return {
      teamName: teamName,
      city: city
    };
  }

}
