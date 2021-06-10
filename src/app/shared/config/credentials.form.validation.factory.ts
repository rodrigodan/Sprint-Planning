import { CredentialsFormValidationLogin } from "./credentials.form.service";
import { CredentialsFormValidation } from "./credentials.form.validation.interface";

export class CredentialsFormValidationFactory{
    public static create(form):CredentialsFormValidation {
        switch (form) {
            case 'login':
                return new CredentialsFormValidationLogin();
        }
    }
}
