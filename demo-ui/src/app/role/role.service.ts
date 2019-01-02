import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Role } from './role.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private refreshURL = environment.appUrl + 'role/roles';
  private addRoleURL = environment.appUrl + 'role/create';
  private editRoleURL = environment.appUrl + 'role/update';
  private deleteRoleURL = environment.appUrl + 'role/delete';

  constructor(private http: HttpClient) {}

  getAllRole(): Promise<Role[]> {
    return this.http
      .get(this.refreshURL, httpOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  addRole(role: Role) {
    return this.http
    .post(this.addRoleURL, role, httpOptions)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  editRole(role: Role) {
    return this.http
    .put(this.editRoleURL, role, httpOptions)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  deleteRole(id: number) {
    return this.http
    .delete(this.editRoleURL + '/' + id, httpOptions)
    .toPromise()
    .then(this.extractData)
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
          title: 'Role Name',
          field: 'name'
        },
        {
          title: 'Description',
          field: 'description'
        },
      ]
    };
  }
}
