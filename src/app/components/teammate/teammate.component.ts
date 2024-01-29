import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeammateService} from "../../service/teammate/teammate.service";
import {catchError, debounceTime, distinctUntilChanged, of, Subscription, switchMap} from "rxjs";
import {Teammate} from "../../models/teammate";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-teammate',
  templateUrl: './teammate.component.html',
  styleUrls: ['./teammate.component.css']
})
export class TeammateComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ["id", "name", "totalGamesPlayed", "wins", "winRate", "team"]
  teammates: Teammate[] = [];
  filteredTeammates: Teammate[] = [];
  sub: Subscription = new Subscription();
  sub2: Subscription;
  isUserLoggedIn: boolean = false;
  searchControl = new FormControl();


  constructor(private teammateService: TeammateService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log("inside ngOnInit in teammate componenet")
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
    this.getTeammates();
    this.sub2 = this.searchFilter();
  }

  ngOnDestroy() {
    console.log("inside ngOnDestroy in teammate componenet")
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  getTeammates() {
    this.sub = this.teammateService.getTeammates()
      .subscribe({
        next: res => {
          this.teammates = res;
          this.filteredTeammates = res;
        },
        error: err => console.error(err),
        complete: () => console.log("Completed getting teammates")
      })
  }

  searchFilter() {
    console.log("value from searchcontrol: ", this.searchControl.value);
    return this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
        switchMap((res) => {
          if (res.toString().length === 0) {
            console.log("logging empty input:", res)
            this.filteredTeammates = this.teammates;
            return this.filteredTeammates;
          }

          this.filteredTeammates = this.teammates
            .filter((teammate) => teammate.name.includes(res) && res.toString().length > 0);
          return this.filteredTeammates;
        }),
        catchError((error) => {
          console.error("error:", error)
          return of([] as Teammate[])
        })
      )
      .subscribe({
        next: value => {
          console.log("current value in next: ", JSON.stringify(value));
        },
        error: err => console.error("Error occurred in subscription:", err),
        complete: () => console.log("completed")
      })
  }
}
