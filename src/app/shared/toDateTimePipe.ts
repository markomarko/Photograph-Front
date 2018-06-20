import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDateTime'
})
export class ToDateTimePipe implements PipeTransform {
  transform(value: number) {
    return new Date(value);
  }
}
