import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { UserManager } from "../shared/Manager/manager.model";

@Injectable()
export class SignupService{
    constructor(private authService: AuthService, private userManager: UserManager) { }

    signUp(signupFormDatas) {
        ({name: this.userManager.name, email: this.userManager.email, password: this.userManager.password} = signupFormDatas.value);
        this.authService.signUp(this.userManager.name, this.userManager.email, this.userManager.password);
    }
}