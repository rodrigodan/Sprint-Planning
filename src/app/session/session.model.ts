import { MatTableDataSource } from "@angular/material/table";

export class SessionModel{

    displayedColumns: string[] = ['employee', 'estimation'];

    people: MatTableDataSource<any>;
    userDev: string = '';
    sprintName: string = '';
    uId: string;
    hash: string;
    notShowEstimates = true;
    valueEstimate;
    smallestValue;
    greatestValue;

}
