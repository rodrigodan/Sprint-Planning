import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class NewPlanningService{
    constructor(

        private firestore: AngularFirestore) {
        // this.user = firebaseAuth.authState;
    }

    newMeetingPlanning(sprintName: String): any{
        let sprint:Object = {
            employess:[],
            sprintName: sprintName
        }
        return (this.firestore
        .collection("Sessions")
        .add(sprint))
    }

}