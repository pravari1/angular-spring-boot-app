import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { ModalService } from '../commons/my-dialog/modal.service';
import * as _moment from 'moment';
import { AlertService } from '../commons/util/alert/alert.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  config: any;
  employee = new Employee();
  mode: string;
  selected: number;
  @ViewChild('employeeForm')
  employeeForm: NgForm;


  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.config = this.employeeService.getConfigObject();
    this.employeeService.getAllEmployee().then(res => {
      this.config.tableData = res;
      console.log('added tabledata');
    });
  }

  openModal(action, id: string, empIndex: number) {
    console.log(this.employeeForm);
    this.mode = action;
    if (this.mode && this.mode.toLowerCase() === 'add') {
      this.selected = -1;
      this.employee = new Employee();
    } else if (this.mode && this.mode.toLowerCase() === 'edit') {
      this.employee = Object.assign({}, this.config.tableData[empIndex]);
      console.log('her=' + this.employee);
      this.selected = empIndex;
    }
    console.log('id=' + id);
    this.resetForm();
    this.modalService.open(id);
  }

  closeModal(id: string) {
    // this.resetForm();
    this.modalService.close(id);
  }

  save() {
    if (this.employeeForm.valid) {
      console.log('date=' + this.employee.dob);
      this.employeeService.addEmployee(this.employee).then(res => {
        if (this.selected === -1) {
          this.config.tableData.push(res);
        } else {
          this.config.tableData[this.selected] = res;
        }
        this.employee = new Employee();
        // this.resetForm();
        this.alertService.success('Saved Successfully.');
      }).catch(() => {
        this.alertService.error('Could not save the record.');
      });
      this.closeModal('employee-modal');
    }
  }

  remove(action,  id: string, empIndex: number) {
    console.log('empIndex' + empIndex);
    if (empIndex !== undefined && confirm('Are you sure?')) {
      this.employeeService.deleteEmployee(this.config.tableData[empIndex].id)
      .then((res) => {
        if (res === 'deleted') {
          this.config.tableData.splice(empIndex, 1);
          this.alertService.success('Employee removed successfully');
        }
      })
      .catch(error => {
        this.alertService.error('Could not delete item');
      });
    }
  }

  refresh(event: any) {
    this.employeeService.getAllEmployee().then(res => {
      this.config.tableData = res;
    }).catch(err => {
      console.log(err);
    });
  }

  resetForm() {
    this.employeeForm.resetForm(this.employee);
  }
}
