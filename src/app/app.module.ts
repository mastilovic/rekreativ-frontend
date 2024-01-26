import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {authInterceptorProviders} from "./auth/auth.interceptor";
import { RoleComponent } from './components/role/role.component';
import { ItemBarComponent } from './components/item-bar/item-bar.component';
import { TeammateComponent } from './components/teammate/teammate.component';
import { TeamComponent } from './components/team/team.component';
import { MatchesComponent } from './components/matches/matches.component';
import {MatMenuModule} from "@angular/material/menu";
import { CreateTeammateComponent } from './components/create-teammate/create-teammate.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import { DeleteTeammateComponent } from './components/delete-teammate/delete-teammate.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import { TeammateDetailComponent } from './components/teammate-detail/teammate-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    NotfoundComponent,
    NavbarComponent,
    LoginComponent,
    RoleComponent,
    ItemBarComponent,
    TeammateComponent,
    TeamComponent,
    MatchesComponent,
    CreateTeammateComponent,
    AdminPanelComponent,
    DeleteTeammateComponent,
    TeammateDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
