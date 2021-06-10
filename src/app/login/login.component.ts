import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CredentialsFormValidationFactory } from '../shared/config/credentials.form.validation.factory';
import { CredentialsFormValidation } from '../shared/config/credentials.form.validation.interface';
import { LoadPageService } from '../shared/services/loading.service'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoadPageService, LoginService, { provide: 'login', useValue: 'login' },{provide:'CredentialsFormValidation', useFactory: CredentialsFormValidationFactory.create, deps: ['login'] }]
})
export class LoginComponent { 
    // public credentialFormValidation: CredentialsFormValidation = CredentialsFormValidationFactory.create('login');
    constructor(
        @Inject('CredentialsFormValidation') private credentialFormValidation: CredentialsFormValidation ,
        public loadPageService: LoadPageService,
        private loginService: LoginService) { }

    public submitFormDataForLogin(signupForm){

        this.loginService.login(signupForm, this.credentialFormValidation) 
            .then(() => {
                this.credentialFormValidation.invalidCredentials = false;
                this.loadPageService.changePageToAlreadyLoaded();   
            })
            .catch(() => {
                this.credentialFormValidation.invalidCredentials = true;
                this.loadPageService.changePageToAlreadyLoaded();   
            });
    }

    public submitDataForLogingAndManagingContentFromScreen(signupForm: NgForm){
        this.loadPageService.changePageToLoading(); 
        this.submitFormDataForLogin(signupForm);
        signupForm.reset();
    }
}
