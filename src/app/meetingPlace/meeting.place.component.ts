import { Component, OnInit } from '@angular/core';
import { UserNoManagerDatas } from '../shared/services/service.user.component';

@Component({
    selector: 'app-meeting-place',
    templateUrl: './meeting.place.component.html',
    styleUrls: ['./meeting.place.component.scss']
})

export class MeetingPlace implements OnInit {
  focus: any;
  focus1: any;
  userDev: string = '';
  sprintName: string = '';

  constructor(private userCommon: UserNoManagerDatas) { }

  ngOnInit() {
    this.sprintName = this.userCommon.sprintName;
  }

  public commonUser(){
    
  }

}
