import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';

import 'firebase/firestore';

@Injectable()
export class AuthService{
    user: Observable<firebase.User>;
    isLoggedIn: boolean = false;
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    idUser: number = 1;


    constructor(
        // private http: HttpClient, 
        private firebaseAuth: AngularFireAuth, 
        private router: Router,
        private firestore: AngularFirestore,
        // private userCommon: UserNoManagerDatas
        ) {
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