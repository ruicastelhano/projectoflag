import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatNumbers'
})
export class FormatNumbersPipe implements PipeTransform {

  transform(num: any): any{
    if (num === 0){
      return ' ';
    }
    if (num > 1000){
      return  Math.round(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
    if (num > 100){
      return Math.round(num * 10) / 10;
    }
    return num;
  }

}
