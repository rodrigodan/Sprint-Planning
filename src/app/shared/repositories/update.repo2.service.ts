import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";


@Injectable()
export class UpdateDataRepo2 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(

        private firestore: AngularFirestore) {
        // this.user = firebaseAuth.authState;
    }
    updateDataRepo2(req: any): any{
        return this.realTimeDataUpdater.doc(req).snapshotChanges().pipe(
            map(
                changes => { 
                    console.log(changes);
                    let data:any = changes.payload.data();
                    return (data)
            })
        )
    }
}
