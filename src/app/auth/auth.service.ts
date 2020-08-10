import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
// import { User } from "../user/user.model";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { rejects } from "assert";


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

class User{
    name: string;
    email: string;
    password: string;
    constructor(name,email,password){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

@Injectable()
export class AuthService{
    user: Observable<firebase.User>;
    isLoggedIn: boolean = false;

    constructor(
        private http: HttpClient, 
        private firebaseAuth: AngularFireAuth, 
        private router: Router,
        private firestore: AngularFirestore) {
        // this.user = firebaseAuth.authState;
    }

    signUp(name, email: string, password: string){

        let user:Object = {
            name2: name,
            email2: email,
            password2: password
        };

        this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
            console.log('Success!', value);
            this.firestore
                .collection("Managers")
                .add(user)
                .then(value2 =>{
                    this.router.navigate(['/login']);
                    console.log('entered here!');
                })
        })
        .catch(err => {
            console.log('Something went wrong:',err.message);
        });
    } 
    
    async login(email: string, password: string): Promise<boolean>{
        let promise;
        await this.firebaseAuth
          .auth
          .signInWithEmailAndPassword(email, password).
          then(value => {
            console.log(value);
            this.isLoggedIn = true;
            this.router.navigate(['/new-planning-meeting']);
            promise = new Promise((resolve, reject) => {
                resolve(true);
            });
          })
          .catch(err => {
            console.log('Something went wrong:',err.message);
            this.isLoggedIn = false;
            promise = new Promise((resolve, reject) => {
               throw new Error("false");
            })
          });
          return promise;

    }

    newMeetingPlanning(sprintName: String): any{
        let sprint:Object = {
            sprintName: sprintName
        }
        return (this.firestore
        .collection("Sessions")
        .add(sprint))
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