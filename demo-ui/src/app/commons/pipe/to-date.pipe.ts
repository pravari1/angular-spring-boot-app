import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    return new Date(value).toString();
  }

}
