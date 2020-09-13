import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserNoManagerDatas } from '../shared/services/service.user.component';
import { NewPlanningService } from './new.planning.service';
import { NewModelPlanning } from './new.planning.model';


@Component({
    selector: 'new-planning',
    templateUrl: './new.planning.component.html'
})

export class NewPlanningMeeting implements OnInit {

    public newModelNewPlanning: NewModelPlanning = new NewModelPlanning();

    constructor(
        private newPlanningService: NewPlanningService) { }

    onSubmit(f: NgForm){
        this.newModelNewPlanning.loadedLink = false;
        this.newModelNewPlanning.sprintName = f.value.sprint;
        this.newPlanningService.newMeetingPlanning(this.newModelNewPlanning)

    }

    statMeetingSession(){
        this.newPlanningService.statMeetingSessionService(this.newModelNewPlanning);
    }

    ngOnInit() {}

}
