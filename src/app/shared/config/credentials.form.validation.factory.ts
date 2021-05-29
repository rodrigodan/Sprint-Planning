import { CredentialsFormValidationLogin } from "./credentials.form.service";

export class CredentialsFormValidationFactory{
    public static create(form):CredentialsFormValidation {
        switch (form) {
            case 'login':
                return new CredentialsFormValidationLogin();
        }
    }
}
