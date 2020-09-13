import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { Router } from "@angular/router";


@Injectable()
export class EmployeeService{
    idUser: number = 1;

    constructor(

        private firestore: AngularFirestore,
        private userCommon: UserNoManagerDatas,
        private router: Router) {
        // this.user = firebaseAuth.authState;
    }

    async newEmployee(employeeName: string, url: string){

        let docRef =  this.firestore.collection("Sessions").doc(url);
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
        
        this.idUser = dataFromBase? dataFromBase.length + 1: 1; 
        dataFromBase = !dataFromBase?[]:dataFromBase; 
        dataFromBase.push({name: employeeName, id: this.idUser});

        await docRef.update({
                employees: dataFromBase
            })
        .then(function() {
            console.log("Document successfully written!");
            worked = true;
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            worked = false;
        });
        this.userCommon.userName = employeeName;
        this.userCommon.userId = url;
        this.userCommon.userType = 'commonUser'
        this.userCommon.sprintName = dataFromBaseSprint;
        this.userCommon.id = this.idUser;
        this.router.navigate(['/meeting-session/' + url]);
    }

}