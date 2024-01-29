import {Component, OnInit} from '@angular/core';
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

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log("calling ngOnInit in admin-panel component");
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
    this.tokenStorageService.handleUnauthorizedAccess();
  }

  switchPanel(panel: string): void {
    this.currentPanel = panel;
    this.selectedTabIndex = 0;
  }
}
