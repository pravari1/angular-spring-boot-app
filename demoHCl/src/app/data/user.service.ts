import { Injectable } from '@angular/core';
import { ReplaySubject,Observable,of } from 'rxjs';
import { User } from '../grid/grid.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users= new ReplaySubject<User>();
  cast = this.users.asObservable();

  private url = 'http://localhost:8080/demoHCLAPP/user';
  constructor(private http:HttpClient) {
    // this.users = [];
  }


  public createUser(userArr:User[]) {

    // console.log("create user="+this.http.get<User>(this.url));
    console.log("create user="+userArr);

    this.http.post<User>(this.url, userArr,httpOptions).subscribe(()=> console.log("I got response"));
  }

  // getUsers(): Observable<User> {
  //   return this.users;
  // }

  addUser(user:User): void{
    this.users.next(user);
  }
}
