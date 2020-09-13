import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { UpdateDataRepo2 } from "../shared/repositories/update.repo2.service";


@Injectable()
export class SessionService{
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");

    constructor(

        private firestore: AngularFirestore,
        private updateDataRepo1: UpdateDataRepo2) {
        // this.user = firebaseAuth.authState;
    }

    updatedLoggeInPeople(hash): any{ 

        return this.updateDataRepo1.updateDataRepo2(hash);

    }

    async updateDevEstimation(employeeId, url,estimateValue){
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

        let temp = dataFromBase[employeeId-1];
        dataFromBase[employeeId-1] = {name: temp.name, id: temp.id, estimation: estimateValue}

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
    }


    async alternateShowNotShowEstimatesForAll(notShowEstimates, url){
        let docRef =  this.firestore.collection("Sessions").doc(url);
        let temporary;
        await docRef.update({
            notShowEstimates: notShowEstimates
        }).then(function() {
            console.log("Document successfully written!");
        })
    }

    async deleteAllEstimates(url){
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

        dataFromBase = dataFromBase.map(item =>{
            return({name: item.name, id: item.id, estimation: ''})
        })

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

    }
}