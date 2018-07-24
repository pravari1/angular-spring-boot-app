import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columnNames: String[];
  constructor() {
    this.columnNames = ["Name","Email","Address","Address 2", "Zip Code", "City", "State / Province / Region", "Country"];
  }

  ngOnInit() {
  }

}
