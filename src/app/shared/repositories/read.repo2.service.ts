import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from "@angular/material/table";
import { map } from "rxjs/operators";
import { SessionModel } from "src/app/session/session.model";


@Injectable()
export class ReadDataRepo2 {
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");
    constructor(

        private firestore: AngularFirestore) {
    }
    readDataRepo2(req: any,sessionModel: SessionModel){
        this.realTimeDataUpdater.doc(req).snapshotChanges().pipe(
            map(
                changes => { 
                    console.log(changes);
                    let data:any = changes.payload.data();
                    return (data)
            })
        ).subscribe(params =>{
            if(!params.employees || params.employees.length === 0) return ;
            sessionModel.notShowEstimates = params.notShowEstimates === undefined ? sessionModel.notShowEstimates : params.notShowEstimates;

            sessionModel.people = new MatTableDataSource(params.employees);
          });
    }
}
