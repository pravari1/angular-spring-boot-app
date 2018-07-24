import { Component, OnInit } from '@angular/core';
import { UserService } from '../data/user.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit{
    public users:User[] = [];

    constructor(private userService: UserService) {
      // this.state:User[] = []{
      //
      // }
    }

    public dataStateChange(user:User): void {
      this.users.push(user);
      console.log("New User Adddres");
    }

    ngOnInit() {
      this.getUsers();
    }
    getUsers(): void {
      this.userService.cast.subscribe(user =>  this.dataStateChange(user));
    }

    save(event) : void{
        console.log("event-"+event);
        this.userService.createUser(this.users);
        this.users = [];
    }




}

export interface User{
  firstName:string;
  lastName:string;
  email:string;
  age:number;
}
