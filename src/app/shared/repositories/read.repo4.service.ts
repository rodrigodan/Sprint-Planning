import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { UserNoManagerDatas } from "../services/service.user.component";
import 'firebase/firestore';



@Injectable()
export class ReadDataRepo4 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async readDataRepo4(req: any, userCommon: UserNoManagerDatas){
        let docRef =  this.firestore.collection("Sessions").doc(userCommon.url);
        let dataFromBase;
        let dataFromBaseSprint;

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