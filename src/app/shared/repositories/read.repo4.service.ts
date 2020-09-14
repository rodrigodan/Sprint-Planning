import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { UserNoManagerDatas } from "../services/service.user.component";


@Injectable()
export class ReadDataRepo4 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    readDataRepo4(req: any, userCommon: UserNoManagerDatas): any{
        let docRef =  this.firestore.collection("Sessions").doc(userCommon.url);
        let dataFromBase;
        let dataFromBaseSprint;

        docRef.get().toPromise().then(function(doc) {
            if (doc.exists) {
                dataFromBase = doc.data();
                dataFromBase = dataFromBase.employees;
                dataFromBaseSprint = doc.data().sprintName;
                dataFromBase = !dataFromBase?[]:dataFromBase; 
                return {dataFromBase, dataFromBaseSprint};
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }

   
}