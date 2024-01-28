import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, of, Subscription, switchMap} from "rxjs";
import {TeammateService} from "../../service/teammate/teammate.service";
import {Teammate} from "../../models/teammate";

@Component({
  selector: 'app-delete-teammate',
  templateUrl: './delete-teammate.component.html',
  styleUrls: ['./delete-teammate.component.css']
})
export class DeleteTeammateComponent implements OnInit, OnDestroy {

  deleteForm: FormGroup;
  sub: Subscription = new Subscription();
  teammate: Teammate;
  searchControl = new FormControl();

  constructor(private formBuilder: FormBuilder,
              private teammateService: TeammateService) {
    this.deleteForm = formBuilder.group({
      name: ['', [ Validators.required ]]
    })
  }

  ngOnInit(): void {
    console.log("inside ngOnInit delete-component")
    this.sub = this.findByName();
  }

  ngOnDestroy() {
    console.log("inside ngOnDestroy delete-component")
    this.sub.unsubscribe();
    // this.sub2.unsubscribe();
  }

  onDelete(): void {
    console.log('inside onDelete method in delete-teammate component')
    let id = this.teammate.id;
    if(id) {
      console.log(id)
      this.sub = this.teammateService.deleteById(id)
        .subscribe({
          next: value => console.log("Deleted succesfully: " + value),
          error: err => console.error(err),
          complete: () => console.log("Completed deleting a teammate!")
        })
      // @ts-ignore
      this.teammate = null;
    }
  }

  findByName() {
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

  //old findByname which doesnt work as intended
  // findByName() {
  //   const name = this.deleteForm.value.name;
  //
  //   this.sub = this.teammateService.findByName(name)
  //     .pipe(
  //       debounceTime(3000),
  //       distinctUntilChanged())
  //     .subscribe({
  //       next: res => {
  //         console.log(this.teammate);
  //         this.teammate = res;
  //         console.log(this.teammate);
  //       },
  //       error: err => console.error(err),
  //       complete: () => "Completed fetching teammate" + this.teammate
  //     })
  // }
}
