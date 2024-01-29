import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {UserComponent} from './components/user/user.component';
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {RoleComponent} from "./components/role/role.component";
import {TeammateComponent} from "./components/teammate/teammate.component";
import {TeamComponent} from "./components/team/team.component";
import {MatchesComponent} from "./components/matches/matches.component";
import {CreateTeammateComponent} from "./components/teammate-create/create-teammate.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserComponent},
  {path: 'roles', component: RoleComponent},
  {path: 'players', component: TeammateComponent},
  {path: 'team', component: TeamComponent},
  {path: 'matches', component: MatchesComponent},
  {path: 'panel', component: AdminPanelComponent},
  {path: 'panel/teammate/create', component: CreateTeammateComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
