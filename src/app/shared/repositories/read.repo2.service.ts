import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from "@angular/material/table";
import { map } from "rxjs/operators";
import { SessionModel } from "src/app/session/session.model";
import 'firebase/firestore';



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
                    if(data.employess.length > 0){

                        let etimation = data.employees.map(item => {
                            return (parseInt(item.estimation));
                        });
                        etimation = etimation.filter(item =>{
                            return(item)
                        })
                        sessionModel.smallestValue = Math.min(...etimation);
                        sessionModel.greatestValue = Math.max(...etimation);
                    }

                    return (data)
            })
        ).subscribe(params =>{
            if(!params.employees || params.employees.length === 0) return ;
            sessionModel.notShowEstimates = params.notShowEstimates === undefined ? sessionModel.notShowEstimates : params.notShowEstimates;

            sessionModel.people = new MatTableDataSource(params.employees);
          });
    }
}
