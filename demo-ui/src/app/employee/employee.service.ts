import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Employee } from './employee.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private refreshURL = environment.appUrl + 'employee/employees';
  private addEmployeeURL = environment.appUrl + 'employee/create';
  private editEmployeeURL = environment.appUrl + 'employee/edit';
  private deleteEmployeeURL = environment.appUrl + 'employee/delete';

  constructor(private http: HttpClient) {}

  getAllEmployee(): Promise<Employee[]> {
    return this.http
      .get(this.refreshURL, httpOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addEmployee(employee: Employee) {
    return this.http
    .post(this.addEmployeeURL, employee, httpOptions)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  editEmployee(employee: Employee) {
    return this.http
    .put(this.editEmployeeURL, employee, httpOptions)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  deleteEmployee(id: number) {
    return this.http
    .delete(this.deleteEmployeeURL + '/' + id,  { observe: 'response' })
    .toPromise()
    .then((res: HttpResponse<any>) => {
      switch (res.status) {
        case 204: {
          return 'deleted';
        }
        case 500: {
          return 'error';
        }
      }
    })
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log(res);
    return res;
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getConfigObject() {
    return {
      tableData: [],
      headers: [
        {
          title: 'Id',
          field: 'id'
        },
        {
          title: 'First Name',
          field: 'firstName'
        },
        {
          title: 'Last Name',
          field: 'lastName'
        },
        {
          title: 'Email',
          field: 'email'
        },
        {
          title: 'Date',
          field: 'dob'
        }
      ]
    };
  }
}
