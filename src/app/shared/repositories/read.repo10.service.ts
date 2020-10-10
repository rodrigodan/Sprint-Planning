import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionModel } from "src/app/session/session.model";
import 'firebase/firestore';

@Injectable()
export class ReadDataRepo10 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(
        private firestore: AngularFirestore) {
    }
    async readDataRepo10(req: any, url){
        let docRef =  this.firestore.collection("Sessions").doc(url);
        let verifyValidity: boolean;
        await docRef.get().toPromise().then(function(doc) {
                verifyValidity = doc.exists
              
            }
        ).catch(function(error) {
            console.log("Error getting document:", error);
        });

        return verifyValidity;
    }
}