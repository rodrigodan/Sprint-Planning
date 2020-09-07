import { Component, OnInit } from '@angular/core';
import { UserNoManagerDatas } from '../shared/services/service.user.component';
import { AuthService } from '../auth/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
    selector: 'app-meeting-place',
    templateUrl: './meeting.place.component.html',
    styleUrls: ['./meeting.place.component.scss']
})

export class MeetingPlace implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  people: MatTableDataSource<any>;
  // displayedColumns: string[] = ['name'];
  focus: any;
  focus1: any;
  userDev: string = '';
  sprintName: string = '';

  constructor(private userCommon: UserNoManagerDatas, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.people = new MatTableDataSource(['1','3','5']); 
    this.sprintName = this.userCommon.sprintName;
    const hash = this.router.url.substring(this.router.url.indexOf('user-employee/')+16, this.router.url.length);
    let id = 0;
    this.authService.updatedLoggeInPeople(hash).subscribe(params =>{
      if(!params || params.length === 0) return ;
      id = id + 1;
      this.people = new MatTableDataSource(params);
      // this.people = params;

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
