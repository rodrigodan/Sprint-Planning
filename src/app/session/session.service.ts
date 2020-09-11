import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";


@Injectable()
export class SessionService{
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");

    constructor(

        private firestore: AngularFirestore) {
        // this.user = firebaseAuth.authState;
    }
    newMeetingPlanning(sprintName: String): any{
        let sprint:Object = {
            employees:[],
            sprintName: sprintName
        }
        return (this.firestore
        .collection("Sessions")
        .add(sprint))
    }

    updatedLoggeInPeople(hash): any{ 
      
        return this.realTimeDataUpdater.doc(hash).snapshotChanges().pipe(
            map(
                changes => { 
                    console.log(changes);
                    let data:any = changes.payload.data();
                    return (data)
            })
        )

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