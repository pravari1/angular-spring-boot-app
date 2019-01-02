import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../../employee/employee.service';
import { Employee } from '../../employee/employee.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    @Input('config') config: any;
    public tableData: Employee[];
    public headers: any;
    @Output() addEvent =  new EventEmitter();
    @Output() editEvent = new EventEmitter();
    @Output() refresh = new EventEmitter();
    @Output() remove = new EventEmitter();

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
      console.log('Config=' + JSON.stringify(this.config));
      this.tableData = this.config.tableData;
      this.headers = this.config.headers;
      console.log('Config=' + this.config.headers);
      console.log(this.tableData);
    }

    refreshTable(event): void {
      console.log('event-' + event);
      this.refresh.emit();
    }

    addHandler({ sender }) {
      this.addEvent.emit(-1);
    }

    editHandler({ rowIndex }) {
      this.editEvent.emit(rowIndex);
    }

    removeHandler({ rowIndex }) {
      this.remove.emit(rowIndex);
    }

}
