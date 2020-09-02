import { Component, OnInit } from '@angular/core';
import { UserNoManagerDatas } from '../shared/services/service.user.component';
import { AuthService } from '../auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';


@Component({
    selector: 'app-meeting-place',
    templateUrl: './meeting.place.component.html',
    styleUrls: ['./meeting.place.component.scss']
})

export class MeetingPlace implements OnInit {
  people: {id:number, name: ''}[];
  focus: any;
  focus1: any;
  userDev: string = '';
  sprintName: string = '';

  constructor(private userCommon: UserNoManagerDatas, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.sprintName = this.userCommon.sprintName;
    const hash = this.router.url.substring(this.router.url.indexOf('user-employee/')+16, this.router.url.length);

    let id = 0;
    this.authService.updatedLoggeInPeople(hash).subscribe(params =>{
      if(!params || params.length === 0) return ;
      id = id + 1;
      this.people = params;

      console.log(params);
      // this.people.push({
      //   id: id,
      //   name: params.name
      // })
    });

  }

  public commonUser(){
    
  }

}
