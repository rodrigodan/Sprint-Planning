import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { LoadPageService } from '../shared/services/loading.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoadPageService]
})
export class LoginComponent {
    invalidCredentials = false;

    constructor(private authService: AuthService, public loadPageService: LoadPageService) { }
    submitFormDatasForLoging(signupForm: NgForm){

        this.loadPageService.changeToNoLoaded();    
        const email = signupForm.value.email;
        const password = signupForm.value.password; 
        console.log(email);
        console.log(password);
        this.authService.login(email,password).
        then(() => {
        this.invalidCredentials = false;
            this.loadPageService.changeToLoaded();   
        })
        .catch(() => {
        this.invalidCredentials = true;
        
            this.loadPageService.changeToLoaded();   
        });
        signupForm.reset();
    }
}
