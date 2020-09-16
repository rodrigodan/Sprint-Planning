import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { Router } from "@angular/router";

import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ReadDataRepo4 } from "../shared/repositories/read.repo4.service";
import { UpdateDataRepo5 } from '../shared/repositories/update.repo5.service';
import { ReadDataRepo10 } from "../shared/repositories/read.repo10.service";
import { NewModelEmployee } from "./employee.model";




@Injectable()
export class EmployeeService{

    constructor(
        private userCommon: UserNoManagerDatas,
        private router: Router,
        private readRepo4: ReadDataRepo4,
        private updateRepo5: UpdateDataRepo5,
        private readRepo10: ReadDataRepo10) {
        // this.user = firebaseAuth.authState;
    }

    async newEmployee(userCommon: UserNoManagerDatas){

        userCommon.url = this.router.url.substring(this.router.url.indexOf('user-employee/')+14, this.router.url.length);
        this.userCommon.id = this.userCommon.userIdGenerator();

        let {dataFromBase, dataFromBaseSprint} = await this.readRepo4.readDataRepo4(userCommon.url, userCommon);
        dataFromBase = !dataFromBase?[]:dataFromBase;

        dataFromBase.push({name: userCommon.userName, id: userCommon.id});
        await this.updateRepo5.updateDataRepo5(dataFromBase, userCommon);
        
        this.userCommon.url = userCommon.url;
        this.userCommon.userType = 'commonUser'
        this.userCommon.sprintName = dataFromBaseSprint;
        this.router.navigate(['/meeting-session/' + userCommon.url]);
    }

    async validitOfAHashMeeting(userCommon: UserNoManagerDatas, modelEmployee: NewModelEmployee){
        userCommon.url = this.router.url.substring(this.router.url.indexOf('user-employee/')+14, this.router.url.length);
        let validVerify: boolean = await this.readRepo10.readDataRepo10(userCommon.url, userCommon.url);
        modelEmployee.validityVerify = validVerify;
       
    }

}