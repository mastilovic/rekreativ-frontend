import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoleService} from "../../service/role/role.service";
import {Subscription} from "rxjs";
import {Role} from "../../models/role";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {

  roles: Role[];
  sub: Subscription = new Subscription();
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getRoles() {
    this.sub = this.roleService.getRoles().subscribe({
      next: res => this.roles = res,
      error: err => console.error(err),
      complete: () => console.log("Completed getting roles")
    })
  }
}
