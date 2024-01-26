import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  selectedTabIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onTabChanged(event: number) {
    this.selectedTabIndex = event;
  }
}
