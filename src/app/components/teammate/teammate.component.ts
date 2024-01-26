import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeammateService} from "../../service/teammate/teammate.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-teammate',
  templateUrl: './teammate.component.html',
  styleUrls: ['./teammate.component.css']
})
export class TeammateComponent implements OnInit, OnDestroy {

  teammates: any = [];
  sub: Subscription = new Subscription();

  constructor(private teammateService: TeammateService) { }

  ngOnInit(): void {
    this.getTeammates();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getTeammates() {
    this.sub = this.teammateService.getTeammates().subscribe({
      next: res => this.teammates = res,
      error: err => console.error(err),
      complete: () => console.log("Completed getting teammates")
    })
  }
}
