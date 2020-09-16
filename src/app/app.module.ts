import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';
import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { Session } from './session/session.component';
import { Employee } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDataComponent } from './sections/user-data/user.data.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NewPlanningMeeting } from './planning/new.planning.component';
import { AuthGuard } from './auth/auth.guards.service';
import { AuthService } from './auth/auth.service';
import { LoadingSpinner } from './shared/loading-spinner/loading-spinner.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserNoManagerDatas } from './shared/services/service.user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {  MatDialogModule } from '@angular/material/dialog';
import { TableBasicExample } from './temporary/temporary';
import { SessionService } from './session/session.service';
import { EmployeeService } from './employee/employee.service';
import { NewPlanningService } from './planning/new.planning.service';
import { CreateDataRepo1 } from './shared/repositories/create.repo1.service';
import { ReadDataRepo2 } from './shared/repositories/read.repo2.service';
import { UpdateDataRepo3 } from './shared/repositories/update.repo3.service';
import { ReadDataRepo4 } from './shared/repositories/read.repo4.service';
import { UpdateDataRepo5 } from './shared/repositories/update.repo5.service';
import { ReadDataRepo6 } from './shared/repositories/read.repo6.service';
import { UpdateDataRepo7 } from './shared/repositories/update.repo7.service';
import { ReadDataRepo8 } from './shared/repositories/read.repo8.service';
import { DeleteDataRepo9 } from './shared/repositories/delete.repo9.service';




// import {MatDialogModule} from "@angular/material";



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    Session,
    Employee,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UserDataComponent,
    NewPlanningMeeting,
    LoadingSpinner,
    TableBasicExample
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [HttpClientModule, RouterModule, AuthGuard, AuthService, AngularFirestore,UserNoManagerDatas, SessionService,EmployeeService, NewPlanningService, CreateDataRepo1, ReadDataRepo2, UpdateDataRepo3, ReadDataRepo4, UpdateDataRepo5, ReadDataRepo6, UpdateDataRepo7,ReadDataRepo8,DeleteDataRepo9],
  bootstrap: [AppComponent]
})
export class AppModule { }
