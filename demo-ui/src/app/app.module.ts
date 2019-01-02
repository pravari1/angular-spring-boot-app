import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FieldErrorDisplayComponent } from './commons/field-error-display/field-error-display.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridComponent } from './commons/grid/grid.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './commons/header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { RoleComponent } from './role/role.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from './employee/employee.service';
import { MyDialogComponent } from './commons/my-dialog/my-dialog.component';
import { MatDialogModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ModalService } from './commons/my-dialog/modal.service';
import { ToDatePipe } from './commons/pipe/to-date.pipe';
import { MyDateComponent } from './commons/my-date/my-date.component';
import { AlertComponent } from './commons/util/alert/alert.component';
import { AlertService } from './commons/util/alert/alert.service';
const routes: Routes = [
  // {path: '', component: AppComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'role', component: RoleComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    FieldErrorDisplayComponent,
    GridComponent,
    HeaderComponent,
    EmployeeComponent,
    RoleComponent,
    MyDialogComponent,
    ToDatePipe,
    MyDateComponent,
    AlertComponent,
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  entryComponents: [MyDialogComponent],
  providers: [EmployeeService, ModalService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
