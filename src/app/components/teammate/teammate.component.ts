import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeammateService} from "../../service/teammate/teammate.service";
import {Subscription} from "rxjs";
import {Teammate} from "../../models/teammate";
import {TokenStorageService} from "../../service/tokenstorage/token-storage.service";

@Component({
    selector: 'app-teammate',
    templateUrl: './teammate.component.html',
    styleUrls: ['./teammate.component.css']
})
export class TeammateComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ["id", "name", "totalGamesPlayed", "wins", "winRate", "team"]
    teammates: Teammate[] = [];
    sub: Subscription = new Subscription();
    isUserLoggedIn: boolean;

    constructor(private teammateService: TeammateService,
                private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
        console.log("inside ngOnInit in teammate componenet")
        this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
        this.getTeammates();
    }

    ngOnDestroy() {
        console.log("inside ngOnDestroy in teammate componenet")
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
