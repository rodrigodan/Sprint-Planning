import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isFetching = false;
  focus;
  focus1;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit2(signupForm: NgForm){
    if(!signupForm.valid){
        return ;
    }
    this.isFetching = true;

    const email = signupForm.value.email;
    const password = signupForm.value.password;

    console.log(email);
    console.log(password);
    this.authService.login(email,password).
    then(valueReturned => {
      this.isFetching = false;
    })
    .catch(valueReturned => {
      this.isFetching = false;
    });
    signupForm.reset();
}


}
