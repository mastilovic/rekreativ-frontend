import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchesService} from "../../service/matches/matches.service";
import {Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {

  matches: any = [];

  subscription: Subscription = new Subscription();

  constructor(private matchesService: MatchesService) { }

  ngOnInit(): void {
    this.getMatches();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getMatches(): void {
    this.subscription = this.matchesService.getMatches().subscribe({
      next: res => this.matches = res,
      error: err => console.error(err),
      complete: () => console.log("Completed getting matches")
    });
  }
}
