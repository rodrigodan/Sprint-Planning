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
import { ReadDataRepo6 } from "../shared/repositories/read.repo6.service";
import { UpdateDataRepo7 } from "../shared/repositories/update.repo7.service";
import { ReadDataRepo8 } from "../shared/repositories/read.repo8.service";
import { DeleteDataRepo9 } from "../shared/repositories/delete.repo9.service";



@Injectable()
export class SessionService{
    realTimeDataUpdater = this.firestore.collection<any>("Sessions");

    constructor(

        private firestore: AngularFirestore,
        private readRepo2: ReadDataRepo2,
        private updateRepo3: UpdateDataRepo3,
        private router: Router,
        private readRepo6: ReadDataRepo6,
        private updateRepo7: UpdateDataRepo7,
        private readRepo8: ReadDataRepo8,
        private deleteRepo9: DeleteDataRepo9) {
        // this.user = firebaseAuth.authState;
    }

    readLoggeInPeopleAndDataChanges(sessionModel: SessionModel){ 
        sessionModel.hash = this.router.url.substring(this.router.url.indexOf('user-employee/')+18, this.router.url.length);
        this.readRepo2.readDataRepo2(sessionModel.hash,sessionModel);
    }

    async updateDevEstimation(employeeId: any, sessionModel: SessionModel){

        let {dataFromBase, dataFromBaseSprint} = await this.readRepo6.readDataRepo6(sessionModel.hash, sessionModel);

        dataFromBase = !dataFromBase?[]:dataFromBase;

        let position;
        dataFromBase.forEach((element,index) => {
            if(element.id === employeeId){
                position = index;
            }
        });
        dataFromBase[position].estimation = sessionModel.valueEstimate;
        await this.updateRepo3.updateDataRepo3(dataFromBase, sessionModel);

    }

    async alternateShowNotShowEstimatesForAll(notShowEstimates, url){

        await this.updateRepo7.updateDataRepo7(notShowEstimates, url);

    }

    async deleteAllEstimates(url){

        let {dataFromBase, dataFromBaseSprint} = await this.readRepo8.readDataRepo8(null, url);

        dataFromBase = !dataFromBase?[]:dataFromBase;
        dataFromBase = dataFromBase.map(item =>{
            return({name: item.name, id: item.id, estimation: ''})
        })

        await this.deleteRepo9.deleteDataRepo9(dataFromBase, url);
    }
}