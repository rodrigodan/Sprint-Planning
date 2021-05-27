import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserManager } from '../shared/Manager/manager.model';
import { SignupService } from './signup.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers: [SignupService]
})
export class SignupComponent {

    constructor(private signupService: SignupService) { }

    submitFormDatasForSigningUp(signupFormDatas: NgForm){
            this.signupService.signUp(signupFormDatas);
            signupFormDatas.reset();
    }

}
