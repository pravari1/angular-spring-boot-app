import { Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _moment from 'moment';
// import { default as _rollupMoment} from 'moment';
import { MatDatepickerInputEvent } from '@angular/material';
const moment = _moment;

@Component({
  selector: 'app-my-date',
  template: `
    <mat-form-field>
      <mat-datepicker-toggle matPrefix [for]="picker"></mat-datepicker-toggle>
      <input matInput [matDatepicker]="picker" [value]="dateValue" (dateInput)="addEvent('input', $event)">
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyDateComponent),
      multi: true
    }
  ]
})
export class MyDateComponent implements ControlValueAccessor {

  @Input()
  _dateValue;

  get dateValue() {
    // console.log("DateValue="+this._dateValue);
    return moment(this._dateValue, 'MM/DD/YYYY');
  }

  set dateValue(val) {
    this._dateValue = moment(val).format('MM/DD/YYYY');
    this.propagateChange(this._dateValue);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.dateValue = moment(event.value, 'MM/DD/YYYY');
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.dateValue = moment(value, 'MM/DD/YYYY');
    }
  }
  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }


}


