import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { UserNoManagerDatas } from '../shared/services/service.user.component';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})

export class Employee implements OnInit {
    
    constructor(
        private employeeService: EmployeeService,
        private userCommon: UserNoManagerDatas) { }


    ngOnInit() {
        
    }

    onSubmit2(signupForm: NgForm){
        if(!signupForm.valid){
            return ;
        }
        this.userCommon.userName = signupForm.value.name;
        this.employeeService.newEmployee(this.userCommon);
    }

    

  

}
