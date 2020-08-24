import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { MeetingPlace } from './meetingPlace/meeting.place.component';
import { LoginComponent } from './login/login.component';
import { NewPlanningMeeting } from './planning/new.planning.component';
import { AuthGuard } from './auth/auth.guards.service';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-employee/:id',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'meeting-place/:id',          component: MeetingPlace },
    { path: 'login',          component: LoginComponent },
    { path: 'new-planning-meeting',          canActivate: [AuthGuard], component: NewPlanningMeeting },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: "**", redirectTo:"login"}
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