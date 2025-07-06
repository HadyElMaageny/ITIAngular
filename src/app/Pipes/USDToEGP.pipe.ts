import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDToEGP'
})
export class USDToEGPPipe implements PipeTransform {

  transform(value:number, rate:number = 50): number {
    return value * rate; // 1 USD = 50 EGP, adjust as needed
  }

}
