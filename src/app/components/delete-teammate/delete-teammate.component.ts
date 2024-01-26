import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
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

  constructor(private formBuilder: FormBuilder,
              private teammateService: TeammateService) {
    this.deleteForm = formBuilder.group({
      name: ['', [ Validators.required ]]
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // this.sub2.unsubscribe();
  }

  onDelete(): void {
    console.log('inside onDelete method in delete-teammate component')
    this.sub.unsubscribe();

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
    const name = this.deleteForm.value.name;

    this.sub = this.teammateService.findByName(name)
      .pipe(
        debounceTime(3000),
        distinctUntilChanged())
      .subscribe({
        next: res => {
          console.log(this.teammate);
          this.teammate = res;
          console.log(this.teammate);
        },
        error: err => console.error(err),
        complete: () => "Completed fetching teammate" + this.teammate
      })
  }
}
