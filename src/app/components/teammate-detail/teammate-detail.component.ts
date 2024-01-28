import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeammateService} from "../../service/teammate/teammate.service";
import {Teammate} from "../../models/teammate";
import {catchError, debounceTime, of, Subscription, switchMap} from "rxjs";
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
  searchControl = new FormControl();

  constructor(private teammateService: TeammateService,
              private formBuilder: FormBuilder) {
    this.findForm = formBuilder.group({})
    this.sub = this.setupSearchControl();
  }

  ngOnInit(): void {
    console.log("inside teammate-detail ngOnInit component")
  }

  ngOnDestroy() {
    console.log("inside teammate-detail ngOnDestroy component")
    console.log("IS SUB CLOSED: " + this.sub.closed)
    this.sub.unsubscribe()
    console.log("IS SUB CLOSED: " + this.sub.closed)
  }

  setupSearchControl() {
    return this.searchControl.valueChanges
      .pipe(
        debounceTime(700),
        switchMap((query) => {
          console.log("current value in switchmap: ", JSON.stringify(query));
          return this.teammateService.findByName(query)
            .pipe(
              catchError((error) => {
                console.error("error:", error)
                return of({} as Teammate)
              })
            )
        }),
      )
      .subscribe({
        next: value => {
          console.log("current value in next: ", JSON.stringify(value));
          this.teammate = value;
        },
        error: err => console.error("Error occurred in subscription:", err),
        complete: () => console.log("completed")
      })
  }
}
