import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { UserNoManagerDatas } from '../shared/services/service.user.component';


@Component({
    selector: 'new-planning',
    templateUrl: './new.planning.component.html'
})

export class NewPlanningMeeting implements OnInit {
    
    session: string = '';
    loadedLink: boolean = true;
    loadedMeetingPlacePage: boolean = true;
    hash: string = '';
    sprintName: string = '';

    constructor(private authService: AuthService, private router: Router, private userCommon: UserNoManagerDatas) { }

    onSubmit(f: NgForm){
        this.loadedLink = false;
        this.sprintName = f.value.sprint;
        this.authService.newMeetingPlanning(this.sprintName)
        .then(value =>{
            // this.router.navigate(['/meeting-place']);
            console.log('entered here!');
            this.session = "http://localhost:4200/" + 'user-employee/' + value.id;
            this.hash = value.id;
            this.loadedLink = true;
        });
    }

    statMeetingSession(){
        this.loadedMeetingPlacePage = false;
        this.router.navigate(['/meeting-place/' + this.hash]);
        this.userCommon.userId = this.hash;
        this.loadedMeetingPlacePage = true;
        this.userCommon.userType = 'userManager';
        this.userCommon.sprintName = this.sprintName;
    }

    ngOnInit() {}

}
