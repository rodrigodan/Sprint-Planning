import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})

export class Employee implements OnInit {

    
    userNameInserted: boolean = true;
    
    constructor(
        private authService: AuthService,  
        private router: Router,
        private employeeService: EmployeeService) { }

    onSubmit2(signupForm: NgForm){
        if(!signupForm.valid){
            return ;
        }
        const name = signupForm.value.name;
        const url = this.router.url.substring(this.router.url.indexOf('user-employee/')+14, this.router.url.length);
        this.employeeService.newEmployee(name, url);
    }

    

    ngOnInit() {}

}
