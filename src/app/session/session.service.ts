import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { ReadDataRepo2 } from "../shared/repositories/read.repo2.service";
import { SessionModel } from "./session.model";
import { UpdateDataRepo3 } from "../shared/repositories/update.repo3.service";


@Injectable()
export class SessionService{
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");

    constructor(

        private firestore: AngularFirestore,
        private readRepo2: ReadDataRepo2,
        private updateRepo3: UpdateDataRepo3,
        private router: Router) {
        // this.user = firebaseAuth.authState;
    }

    readLoggeInPeopleAndDataChanges(sessionModel: SessionModel){ 
        sessionModel.hash = this.router.url.substring(this.router.url.indexOf('user-employee/')+18, this.router.url.length);
        this.readRepo2.readDataRepo2(sessionModel.hash,sessionModel);
    }

    async updateDevEstimation(employeeId: any, sessionModel: SessionModel){
        sessionModel.uId;
        sessionModel.hash;
        // employeeId, url,estimateValue
        // this.updateRepo3.updateDataRepo3()
        let docRef =  this.firestore.collection("Sessions").doc(sessionModel.hash);
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
        let position;
        dataFromBase.forEach((element,index) => {
            if(element.id === employeeId){
                position = index;
            }
        });
        dataFromBase[position].estimation = sessionModel.valueEstimate;

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