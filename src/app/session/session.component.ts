import { Component, OnInit } from '@angular/core';
import { UserNoManagerDatas } from '../shared/services/service.user.component';
import { AuthService } from '../auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { SessionService } from './session.service';
import { SessionModel } from './session.model';
import {MatRadioModule} from '@angular/material/radio';


@Component({
    selector: 'session',
    templateUrl: './session.component.html',
    styleUrls: ['./session.component.scss']
})

export class Session implements OnInit {

  public sessionModel: SessionModel = new SessionModel();
  public radioButton = '';
  public teste = 'teste';
  public teste2 = true;
  public userCommon2: UserNoManagerDatas

  // displayedColumns: string[] = ['position', 'employee', 'estimation'];

  // people: MatTableDataSource<any>;
  // userDev: string = '';
  // sprintName: string = '';
  // uId: number;
  // hash: string;
  // notShowEstimates = true;

  constructor(
    private userCommon: UserNoManagerDatas,
    private router: Router,
    private session: SessionService) { }

  ngOnInit() {
    this.sessionModel.sprintName = this.userCommon.sprintName;
    this.sessionModel.uId = this.userCommon.id;
    this.userCommon2 = this.userCommon;
    this.session.readLoggeInPeopleAndDataChanges(this.sessionModel);
    this.userCommon2 = this.userCommon;
  }

  public estimate(signupForm: NgForm){
    if(!signupForm.valid){
      return ;
    }
    this.sessionModel.valueEstimate = signupForm.value.time;
    this.session.updateDevEstimation(this.userCommon.id, this.sessionModel);
    this.userCommon2 = this.userCommon;
  }

  public alternateShowNotShowEstimates(){
    this.sessionModel.notShowEstimates = !this.sessionModel.notShowEstimates;
    this.session.alternateShowNotShowEstimatesForAll(this.sessionModel.notShowEstimates,this.sessionModel.hash)
    this.userCommon2 = this.userCommon;  
  }

  public deleteEstimates(){
    this.session.deleteAllEstimates(this.sessionModel.hash);
    this.userCommon2 = this.userCommon;
  }

  public onRadioButtonClick(){
    console.log(this.radioButton);
    if(this.radioButton !== ''){
      this.radioButton = ''
    }
    this.userCommon2 = this.userCommon;
  }

  public outlierEstimation(){

  }

}
