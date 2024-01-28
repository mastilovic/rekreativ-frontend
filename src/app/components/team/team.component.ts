import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from "../../service/team/team.service";
import {Subscription} from "rxjs";
import {Team} from "../../models/team";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnDestroy {

    teams: Team[];
    sub: Subscription = new Subscription();
    isUserLoggedIn: boolean = false;

    constructor(private teamService: TeamService,
                private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
        this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
        this.getTeams();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        console.log("team component destroyed")
    }

    getTeams(): void {
        this.sub = this.teamService.getTeams().subscribe({
            next: res => this.teams = res,
            error: err => console.error(err),
            complete: () => console.log("Completed getting teams")
        });
    }
}
