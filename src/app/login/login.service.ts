import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { UserManager } from "../shared/Manager/manager.model";

@Injectable()
export class LoginService{
    constructor(private authService: AuthService, private userManager: UserManager) { }


    public login(signupFormDatas, credentialFormValidation):Promise<any>{
        ({ email: this.userManager.email, password: this.userManager.password} = signupFormDatas.value);
        return this.authService.login(this.userManager.email,this.userManager.password);

    }
}