import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../service/tokenstorage/token-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  sub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router) {
      this.loginForm = formBuilder.group({
        username: ['', [ Validators.required ]],
        password: ['', [ Validators.required ]]
      })
    }

  ngOnInit(): void {
    console.log("inside ngOnInit in login component");
  }

  ngOnDestroy(): void {
    console.log("inside ngOnDestroy in login component");
    console.log('is sub closed: ',this.sub.closed);
    this.sub.unsubscribe();
    console.log('is sub closed: ',this.sub.closed);
  }

  onLogin(): void{
    console.log('inside onLogin method in login component')
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const user = {"username": username, "password": password};

    this.sub = this.authService.login(user)
    .subscribe({
      next: res => {
        const token = res.headers.get('token');
        // to keep track of which user is logged in, we should store user in local storage too
        // refer to this for saving user to local storage: https://github.com/bezkoder/angular-10-spring-boot-jwt-authentication/blob/80d4ff8e9beac4de5189c31cbc5cc4d78baab274/angular-10-client/src/app/_services/token-storage.service.ts
        // refer to this for loading currently logged in user: https://github.com/bezkoder/angular-10-spring-boot-jwt-authentication/blob/80d4ff8e9beac4de5189c31cbc5cc4d78baab274/angular-10-client/src/app/profile/profile.component.ts#L16
        //TODO: CREATE LOGOUT BUTTON THAT DELETES TOKEN FROM LOCALSTORAGE!
        this.tokenStorageService.saveToken(token);
        this.tokenStorageService.saveUser(username);
        this.router.navigate([''])
        .then(() => window.location.reload())
      },
      error: err => console.error(err),
      complete: () => console.log("Login completed in LoginComponent!")
    });
    console.log('finishing onLogin method in login component')
  }
}
