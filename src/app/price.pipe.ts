import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PricePipe'
})
export class PricePipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase();
  }

}
