import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchesService} from "../../service/matches/matches.service";
import {Observable, Subject, Subscription} from "rxjs";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean;
  matches: any = [];
  subscription: Subscription = new Subscription();

  constructor(private matchesService: MatchesService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
    this.getMatches();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    console.log("matches component destroyed")
  }

  getMatches(): void {
    this.subscription = this.matchesService.getMatches().subscribe({
      next: res => this.matches = res,
      error: err => console.error(err),
      complete: () => console.log("Completed getting matches")
    });
  }
}
