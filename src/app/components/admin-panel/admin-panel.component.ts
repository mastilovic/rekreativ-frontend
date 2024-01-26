import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  selectedTabIndex: number = 0;
  currentPanel: string = "team";

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged(event: number) {
    this.selectedTabIndex = event;
  }

  setCurrentPanel(panel: string) {
    if(panel==="teammate"){
      this.currentPanel = "teammate";
    }
    else if(panel==="team"){
      this.currentPanel = "team";
    }
    else if(panel==="matchup"){
      this.currentPanel = "matchup";
    }
    this.currentPanel = "";
  }
}
