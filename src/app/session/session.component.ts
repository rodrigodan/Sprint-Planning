import { Component, OnInit } from '@angular/core';
import { UserNoManagerDatas } from '../shared/services/service.user.component';
import { AuthService } from '../auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { SessionService } from './session.service';

@Component({
    selector: 'session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss']
})

export class Session implements OnInit {
  displayedColumns: string[] = ['position', 'employee', 'estimation'];

  people: MatTableDataSource<any>;
  userDev: string = '';
  sprintName: string = '';
  uId: number;
  hash: string;
  notShowEstimates = true;

  constructor(
    private userCommon: UserNoManagerDatas, 
    private authService: AuthService, 
    private router: Router,
    private session: SessionService) { }

  ngOnInit() {
    this.sprintName = this.userCommon.sprintName;
    this.hash = this.router.url.substring(this.router.url.indexOf('user-employee/')+18, this.router.url.length);
    let id = 0;
    this.session.updatedLoggeInPeople(this.hash).subscribe(params =>{
      if(!params.employees || params.employees.length === 0) return ;
      id = id + 1;

      this.uId = params.employees? params.employees.length + 1:1;
      this.notShowEstimates = !params.notShowEstimates ? false: true;
      if(params.notShowEstimates === undefined){
        this.notShowEstimates = true;
      }
      this.people = new MatTableDataSource(params.employees);
    });

  }

  public estimate(signupForm: NgForm){
    if(!signupForm.valid){
      return ;
    }
  const valueEstimate = signupForm.value.time;
  this.session.updateDevEstimation(this.userCommon.id, this.hash, valueEstimate);
  }

  public alternateShowNotShowEstimates(){
    this.notShowEstimates = !this.notShowEstimates;
    this.session.alternateShowNotShowEstimatesForAll(this.notShowEstimates,this.hash)
  }

  public deleteEstimates(){
    this.session.deleteAllEstimates(this.hash);
  }

}
