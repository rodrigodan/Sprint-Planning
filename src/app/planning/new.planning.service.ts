import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { CreateDataRepo1 } from "../shared/repositories/create.repo1.service";
import { UserNoManagerDatas } from "../shared/services/service.user.component";
import { NewModelPlanning } from "./new.planning.model";


@Injectable()
export class NewPlanningService{
    constructor(
        private createRepo1: CreateDataRepo1,
        private userCommon: UserNoManagerDatas,
        private router: Router) {}

    newMeetingPlanning(newModelNewPlanning: NewModelPlanning){
        let sprint:Object = {
            employess:[],
            sprintName: newModelNewPlanning.sprintName
        }
        this.createRepo1.createDataRepo1(sprint, newModelNewPlanning);
    }

    statMeetingSessionService(newModelNewPlanning: NewModelPlanning){
        newModelNewPlanning.loadedMeetingPlacePage = false;
        this.router.navigate(['/meeting-session/' + newModelNewPlanning.hash]);
        this.userCommon.userId = newModelNewPlanning.hash;
        newModelNewPlanning.loadedMeetingPlacePage = true;
        this.userCommon.userType = 'userManager';
        this.userCommon.sprintName = newModelNewPlanning.sprintName;
    }
}