import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionModel } from "src/app/session/session.model";
import 'firebase/firestore';


@Injectable()
export class ReadDataRepo6 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async readDataRepo6(req: any, sessionModel: SessionModel){
        let docRef =  this.firestore.collection("Sessions").doc(sessionModel.hash);
        let dataFromBase;
        let dataFromBaseSprint;
        let worked: boolean = true;
        await docRef.get().toPromise().then(function(doc) {
            if (doc.exists) {
                dataFromBase = doc.data();
                dataFromBase = dataFromBase.employees;
                dataFromBaseSprint = doc.data().sprintName;
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        return {dataFromBase, dataFromBaseSprint};
    }
}