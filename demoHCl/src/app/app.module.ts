import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table/table-row/table-row.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridComponent } from './grid/grid.component';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    FieldErrorDisplayComponent,
    TableComponent,
    TableRowComponent,
    GridComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
