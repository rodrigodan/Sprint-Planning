import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CredentialsFormValidationFactory } from '../shared/config/credentials.form.validation.factory';
import { LoadPageService } from '../shared/services/loading.service'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoadPageService, LoginService]
})
export class LoginComponent {
    public credentialFormValidation: CredentialsFormValidation = CredentialsFormValidationFactory.create('login');
    constructor(
        public loadPageService: LoadPageService,
        private loginService: LoginService) { }

    public submitFormDataForLogin(signupForm){

        this.loginService.login(signupForm, this.credentialFormValidation) 
            .then(() => {
                this.credentialFormValidation.invalidCredentials = false;
                this.loadPageService.changeToPageLoaded();   
            })
            .catch(() => {
                this.credentialFormValidation.invalidCredentials = true;
                this.loadPageService.changeToPageLoaded();   
            });
    }

    public submitFormDatasForLogingAndManagingContentFromScreen(signupForm: NgForm){
        this.loadPageService.changeToLoadingPage(); 
        this.submitFormDataForLogin(signupForm);
        signupForm.reset();
    }
}
