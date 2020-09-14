
import { v4 as uuidv4 } from 'uuid';
export class UserNoManagerDatas{
    userType: string = '';
    userName: string = ''; 
    url: string = ''; //url
    sprintName: string = '';
    id: string;

    public userIdGenerator():string{
        return uuidv4()
    }
} 