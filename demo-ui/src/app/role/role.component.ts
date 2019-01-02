import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { ModalService } from '../commons/my-dialog/modal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  config: any;
  role = new Role();
  mode: string;
  selected: number;
  @ViewChild('roleForm')
  roleForm: NgForm;

  constructor(private roleService: RoleService, private modalService: ModalService) { }

  ngOnInit() {
    this.config = this.roleService.getConfigObject();
    this.roleService.getAllRole().then(res => {
      this.config.tableData = res;
      console.log('added tabledata');
    });
  }

  openModal(action, id: string, empIndex: number) {
    console.log(this.roleForm);
    this.resetForm();
    this.mode = action;
    if (this.mode && this.mode.toLowerCase() === 'add') {
      this.selected = -1;
      this.role = new Role();
    } else if (this.mode && this.mode.toLowerCase() === 'edit') {
      this.role = this.config.tableData[empIndex];
      this.selected = empIndex;
    }
    console.log('id=' + id);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  save() {
    if (this.roleForm.valid) {
      this.roleService.addRole(this.role).then(res => {
        if (this.selected === -1) {
          this.config.tableData.push(res);
        } else {
          this.config.tableData[this.selected] = res;
        }
      });
      this.resetForm();
    }
  }

  refresh(event: any) {
    this.roleService.getAllRole().then(res => {
      this.config.tableData = res;
    });
  }

  resetForm() {
    this.role = new Role();
  }

}
