import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/tokenstorage/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.tokenStorageService.getIsUserLogged();
  }

  onLogout(): void {
    this.tokenStorageService.removeTokenAndUser();
    this.router.navigate(['login'])
      .then(() => window.location.reload());
  }
}
