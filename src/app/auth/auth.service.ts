import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { User } from "../user/user.model";

interface AuthResponseData{
    kind: string;
    id: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root', })
export class AuthService{
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signUp(name, email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcAaqU4exlcXxOPnDjCmfmwhwbvioAgsg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(resData =>
                {
                    const expirationData = new Date(new Date().getTime() + +resData.expiresIn*1000);
                    const user = new User(name, resData.email, resData.localId, resData.idToken,expirationData);
                    this.user.next(user);
                }
            )
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcAaqU4exlcXxOPnDjCmfmwhwbvioAgsg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(resData =>
                {
                    const expirationData = new Date(new Date().getTime() + +resData.expiresIn*1000);
                    const user = new User(name, resData.email, resData.localId, resData.idToken,expirationData);
                    this.user.next(user);
                }
            )
        );;
    }
}