import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { Router } from "@angular/router";

import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ReadDataRepo4 } from "../shared/repositories/read.repo4.service";



@Injectable()
export class EmployeeService{
    idUser: number = 1;

    constructor(

        private firestore: AngularFirestore,
        private userCommon: UserNoManagerDatas,
        private router: Router,
        private readRepo4: ReadDataRepo4) {
        // this.user = firebaseAuth.authState;
    }

    async newEmployee(userCommon: UserNoManagerDatas){

        userCommon.url = this.router.url.substring(this.router.url.indexOf('user-employee/')+14, this.router.url.length);
        this.userCommon.id = this.userCommon.userIdGenerator();

        // let {dataFromBase, dataFromBaseSprint} = await this.readRepo4.readDataRepo4(userCommon.url, userCommon);

        // dataFromBase.push({name: userCommon.userName, id: userCommon.id});


        let docRef =  this.firestore.collection("Sessions").doc(userCommon.url);
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
        dataFromBase = !dataFromBase?[]:dataFromBase; 
        dataFromBase.push({name: userCommon.userName, id: this.userCommon.id});

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
        this.userCommon.url = userCommon.url;
        this.userCommon.userType = 'commonUser'
        this.userCommon.sprintName = dataFromBaseSprint;
        // this.userCommon.id = this.idUser;
        this.router.navigate(['/meeting-session/' + userCommon.url]);
    }

}