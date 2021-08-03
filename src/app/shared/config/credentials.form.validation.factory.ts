import { CredentialsFormValidationLogin } from "./credentials.form-login.service";
import { CredentialsFormValidationSignUp } from "./credentials.form-signup.service";
import { CredentialsFormValidation } from "./credentials.form.validation.interface";

export class CredentialsFormValidationFactory{
    public static create(form):CredentialsFormValidation {
        switch (form) {
            case 'login':
                return new CredentialsFormValidationLogin();
            case 'SignUp':
                return new CredentialsFormValidationSignUp();
        }
    }
}
