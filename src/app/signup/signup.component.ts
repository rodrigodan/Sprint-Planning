import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    
    constructor(private authService: AuthService) { }

    ngOnInit() {

    }
    onSubmit(signupForm: NgForm){
        if(!signupForm.valid){
            return ;
        }
        const email = signupForm.value.email;
        const username = signupForm.value.username;

        const password = signupForm.value.password;

        console.log(email);
        console.log(password);

        this.authService.signUp(username, email,password).subscribe(resData => {
            console.log(resData);
        },
        error => {
            console.log(error);
        });

        signupForm.reset();
        
    }

}
