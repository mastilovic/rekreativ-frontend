import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../service/user/user.service';
import {Subscription} from "rxjs";
import {User} from "../../models/user";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  users: User[];
  sub: Subscription = new Subscription();
  isUserLoggedIn: boolean = false;

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
    this.getUsers();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUsers() {
    this.sub = this.userService.getUsers().subscribe({
      next: res => this.users = res,
      error: err => console.error(err),
      complete: () => console.log("Completed getting users")
    })

    return this.users;
  }

}
