import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionModel } from "src/app/session/session.model";
@Injectable()
export class DeleteDataRepo9 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async deleteDataRepo9(req: any, url){
        let docRef =  this.firestore.collection("Sessions").doc(url);
        await docRef.update({
            employees: req
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

}