import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { User } from "../user/user.model";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

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

@Injectable()
export class AuthService{
    user: Observable<firebase.User>;
    isLoggedIn: boolean = false;

    constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth, private router: Router) {
        this.user = firebaseAuth.authState;
    }

    signUp(name, email: string, password: string){

        this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
            console.log('Success!', value);
            this.router.navigate(['/login']);
        })
        .catch(err => {
            console.log('Something went wrong:',err.message);
        });
    } 
    
    login(email: string, password: string): any{
        this.firebaseAuth
          .auth
          .signInWithEmailAndPassword(email, password).
          then(value => {
            console.log(value);
            this.isLoggedIn = true;
            this.router.navigate(['/new-planning-meeting']);
            let promise = new Promise((resolve, reject) => {
                resolve(true);
            });
            return promise;
          })
          .catch(err => {
            console.log('Something went wrong:',err.message);
            this.isLoggedIn = false;
            let promise = new Promise((resolve, reject) => {
                reject(false);
            })
            return promise;
          });
    }

    loginIsAuthenticated(){
        const promise = new Promise(
            (resolve,reject) => {
                resolve(this.isLoggedIn);
            }
        );
        return promise;
    }

      logout() {
        this.firebaseAuth
          .auth
          .signOut();
      }


    //     return this.http.post<AuthResponseData>(
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCcAaqU4exlcXxOPnDjCmfmwhwbvioAgsg',
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }
    //     ).pipe(
    //         tap(resData =>
    //             {
    //                 const expirationData = new Date(new Date().getTime() + +resData.expiresIn*1000);
    //                 const user = new User(name, resData.email, resData.localId, resData.idToken,expirationData);
    //                 this.user.next(user);
    //             }
    //         )
    //     );
    // }

    // login(email: string, password: string){
    //     return this.http.post<AuthResponseData>(
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCcAaqU4exlcXxOPnDjCmfmwhwbvioAgsg',
    //         {
    //             email: email,
    //             password: password,
    //             returnSecureToken: true
    //         }
    //     ).pipe(
    //         tap(resData =>
    //             {
    //                 const expirationData = new Date(new Date().getTime() + +resData.expiresIn*1000);
    //                 const user = new User(name, resData.email, resData.localId, resData.idToken,expirationData);
    //                 this.user.next(user);
    //             }
    //         )
    //     );;
    // }
}