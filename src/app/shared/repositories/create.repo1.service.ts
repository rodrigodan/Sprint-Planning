import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { NewModelPlanning } from "src/app/planning/new.planning.model";


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
                newModelNewPlanning.session = "http://localhost:4200/" + 'user-employee/' + value.id;
                newModelNewPlanning.hash = value.id;
                newModelNewPlanning.loadedLink = true;
            });

    }
}