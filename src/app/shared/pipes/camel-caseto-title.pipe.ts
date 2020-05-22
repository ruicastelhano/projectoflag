import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'camelCaseToTitle'
})
export class CamelCaseToTitlePipe implements PipeTransform {

  transform(value: string) {
    if ((typeof value) !== 'string') {
      return value;
    }
    value = value.split(/(?=[A-Z])/).join(' ');
    value = value[0].toUpperCase() + value.slice(1);
    return value;
  }

}
