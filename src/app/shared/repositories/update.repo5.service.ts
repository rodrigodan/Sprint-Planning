import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { UserNoManagerDatas } from '../services/service.user.component';
import 'firebase/firestore';

@Injectable()
export class UpdateDataRepo5 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async updateDataRepo5(req: any, userCommon: UserNoManagerDatas){
        let docRef =  this.firestore.collection("Sessions").doc(userCommon.url);

        await docRef.update({
            employees: req
        })
        .then(function() {
            console.log("Document successfully written!");
            // worked = true;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            // worked = false;
        });
    }

}