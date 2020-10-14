import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { UserNoManagerDatas } from '../services/service.user.component';
import * as firebase from 'firebase/app';

@Injectable()
export class UpdateDataRepo5 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async updateDataRepo5(teste: any, userCommon: UserNoManagerDatas){
        let sprintName = '';
        let docRef =  this.firestore.collection("Sessions").doc(userCommon.url);

        // await docRef.update({
        //     employees: req
        // })
        await docRef.update({
            employees: firebase.firestore.FieldValue.arrayUnion(teste)
        })
        await docRef.get().toPromise().then(function(doc) {
            if (doc.exists) {
                sprintName = doc.data().sprintName;
            }
        })
        return sprintName;
        // .then(function() {
        //     console.log("Document successfully written!");
        //     // worked = true;
        // })
        // .catch(function(error) {
        //     console.error("Error writing document: ", error);
        //     // worked = false;
        // });
    }

}