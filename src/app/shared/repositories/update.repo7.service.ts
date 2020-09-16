import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionModel } from "src/app/session/session.model";
@Injectable()
export class UpdateDataRepo7 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async updateDataRepo7(req: any, url){
        let docRef =  this.firestore.collection("Sessions").doc(url);
        await docRef.update({
            notShowEstimates: req
        }).then(function() {
            console.log("Document successfully written!");
        })
    }

}