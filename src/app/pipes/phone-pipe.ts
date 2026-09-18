import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
transform(value: string): string {
    if (!value) return '';
    if (value.length === 9) {
      return `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 7)} ${value.slice(7)}`;
    } else if (value.length === 10) {
      return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7)}`;
    }
    return value;
  }
}
