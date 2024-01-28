import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  selectedTabIndex: number = 0;
  currentPanel: string = "teammate";
  isUserLoggedIn: boolean = false;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    console.log("calling ngOnInit in admin-panel component")
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged()
    this.handleUnauthorizedAccess(this.isUserLoggedIn);
  }

  handleUnauthorizedAccess(isUserLoggedIn: boolean) {
    if(!isUserLoggedIn) {
      this.tokenStorageService.removeTokenAndUser();
      this.router.navigate([''])
          .then(() => window.location.reload())
    }
  }
}
