import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    
    userNameInserted: boolean = true;
    
    constructor(private authService: AuthService,  private router: Router) { }

    onSubmit2(signupForm: NgForm){
        if(!signupForm.valid){
            return ;
        }
        const name = signupForm.value.name;
        const url = this.router.url.substring(this.router.url.indexOf('user-employee/')+14, this.router.url.length);
        this.authService.newEmployee(name, url);
    }

    

    ngOnInit() {}

}
