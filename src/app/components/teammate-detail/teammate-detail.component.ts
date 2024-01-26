import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeammateService} from "../../service/teammate/teammate.service";
import {Teammate} from "../../models/teammate";
import {catchError, debounceTime, of, Subscription, switchMap, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-teammate-detail',
  templateUrl: './teammate-detail.component.html',
  styleUrls: ['./teammate-detail.component.css']
})
export class TeammateDetailComponent implements OnInit, OnDestroy {

  teammate: Teammate;
  sub: Subscription = new Subscription();
  findForm: FormGroup;
  loading = false;
  searchControl = new FormControl();

  constructor(private teammateService: TeammateService,
              private formBuilder: FormBuilder) {
    this.findForm = formBuilder.group({})
    this.sub = this.setupSearchControl();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log("IS SUB CLOSED: " + this.sub.closed)
    this.sub.unsubscribe()
    console.log("IS SUB CLOSED: " + this.sub.closed)
  }

  setupSearchControl() {
    return this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
        tap(() => (this.loading = true)),
        switchMap((query) => {
          return this.teammateService.findByName(query)
            .pipe(
              catchError((error) => {
                console.error("error:", error)
                return of({} as Teammate)
              })
            )
          // return timer(300).pipe(
          //   switchMap(() => this.teammateService.findByName(query)),
          //   catchError((error) => {
          //     console.error('Search failed:', error);
          //     return of({} as Teammate);
          //   })
          // );
        }),
      )
      .subscribe({
        next: value => {
          this.teammate = value;
          this.loading = false;
        },
        error: err => console.error("Error occurred in subscription:", err),
        complete: () => console.log("completed")
      })
  }
}
