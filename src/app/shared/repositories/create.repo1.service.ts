import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { NewModelPlanning } from "src/app/planning/new.planning.model";
import 'firebase/firestore';



@Injectable()
export class CreateDataRepo1 {

    constructor(private firestore: AngularFirestore){}

    createDataRepo1(req: any, newModelNewPlanning: NewModelPlanning){

        this.firestore
            .collection("Sessions")
            .add(req)
            .then(value =>{
                // this.router.navigate(['/meeting-session']);
                console.log('entered here!');
                newModelNewPlanning.session = "https://sprint-planning-826b1.web.app/" + 'user-employee/' + value.id;
                newModelNewPlanning.hash = value.id;
                newModelNewPlanning.loadedLink = true;
            });

    }
}