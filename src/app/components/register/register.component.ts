import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    registerForm: FormGroup;
    sub: Subscription = new Subscription();

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router) {
        this.registerForm = formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
        console.log("inside ngOnInit in register component");
    }

    ngOnDestroy(): void {
        console.log("inside ngOnDestroy register component")
        this.sub.unsubscribe();
    }

    onRegister(): void {
        let username = this.registerForm.value.username;
        let password = this.registerForm.value.password;
        const user = {"username": username, "password": password};

        this.sub = this.authService.register(user)
            .subscribe({
                next: res => {
                    const token = res.headers.get('token');
                    this.authService.onLoginSuccess(token, user.username)
                    this.router.navigate([''])
                        .then(() => window.location.reload())
                },
                error: err => {
                    console.error(err)
                    this.authService.onLoginUnsuccess();
                },
                complete: () => console.log("completed registration!")
            })
    }
}
