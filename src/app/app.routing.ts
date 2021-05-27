import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { Employee } from './employee/employee.component';
import { SignupComponent } from './signup/signup.component';
import { Session } from './session/session.component';
import { LoginComponent } from './login/login.component';
import { NewPlanningMeeting } from './planning/new.planning.component';
import { AuthGuard } from './auth/auth.guards.service';
// import { TableBasicExample } from './temporary/temporary';

const routes: Routes =[
    // { path: 'home',             canActivate: [AuthGuard], component: HomeComponent },
    { path: 'user-employee/:id',     component: Employee },
    { path: 'register',           component: SignupComponent },
    { path: 'meeting-session/:id',          component: Session },
    { path: 'login',          component: LoginComponent },
    { path: 'new-planning-meeting',          canActivate: [AuthGuard], component: NewPlanningMeeting },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: "**", canActivate: [AuthGuard], redirectTo:"login"},
    // {path: "teste", component: TableBasicExample }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
// https://medium.com/madhash/how-to-create-and-read-things-in-firebase-c5f51d0552ce