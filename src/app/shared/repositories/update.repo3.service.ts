import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionModel } from "src/app/session/session.model";
import 'firebase/firestore';



@Injectable()
export class UpdateDataRepo3 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async updateDataRepo3(req: any,sessionModel: SessionModel){

        let docRef =  this.firestore.collection("Sessions").doc(sessionModel.hash);

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