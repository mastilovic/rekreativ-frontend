import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeammateService} from "../../service/teammate/teammate.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Teammate} from "../../models/teammate";
import {Subscription} from "rxjs";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";

@Component({
  selector: 'app-create-teammate',
  templateUrl: './create-teammate.component.html',
  styleUrls: ['./create-teammate.component.css']
})
export class CreateTeammateComponent implements OnInit, OnDestroy {

  createForm: FormGroup;
  sub: Subscription = new Subscription();
  isUserLoggedIn: boolean = false;


  constructor(private teammateService: TeammateService,
              formBuilder: FormBuilder,
              private tokenStorageService: TokenStorageService) {
    this.createForm = formBuilder.group({
      name: [''],
      totalGamesPlayed: [''],
      wins: [''],
      winRate: [''],
      team: ['']
    })
  }

  ngOnInit(): void {
    console.log("ngOnInit create teammate component")
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
    this.tokenStorageService.handleUnauthorizedAccess(this.isUserLoggedIn);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log("create teammate component destroyed")
  }

  create() {
    const teammate = this.buildTeammate();
    this.sub = this.teammateService.createTeammate(teammate)
      .subscribe({
        next: res => console.log(res),
        error: err => console.error(err),
        complete: () => console.log("Create completed in CreateTeammateComponent!")
      })
  }

  private buildTeammate(): Teammate {
    const name = this.createForm.value.name;
    const totalGamesPlayed = this.createForm.value.totalGamesPlayed;
    const wins = this.createForm.value.wins;
    const winRate = this.createForm.value.winRate;
    const team = this.createForm.value.team;

    return {
      name: name,
      totalGamesPlayed: totalGamesPlayed,
      wins: wins,
      winRate: winRate,
      team: []
    };
  }

}
