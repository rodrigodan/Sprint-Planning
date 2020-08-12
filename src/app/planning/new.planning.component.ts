import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'new-planning',
    templateUrl: './new.planning.component.html'
})

export class NewPlanningMeeting implements OnInit {
    
    session: string = '';
    loadedLink: boolean = true;
    loadedMeetingPlacePage: boolean = true;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit(f: NgForm){
        this.loadedLink = false;
        const sprintName = f.value.sprint;
        this.authService.newMeetingPlanning(sprintName)
        .then(value =>{
            // this.router.navigate(['/meeting-place']);
            console.log('entered here!');
            this.session = "http://localhost:4200/" + 'user-employee/' + value.id;
            this.loadedLink = true;
        });
    }

    statMeetingSession(){
        this.loadedMeetingPlacePage = false;
        this.router.navigate(['/meeting-place']);
        this.loadedMeetingPlacePage = true;
    }

    ngOnInit() {}

}
