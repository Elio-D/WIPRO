import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../interfaces/position';

@Pipe({
  name: 'filterPosition'
})
export class FilterPositionPipe implements PipeTransform {

  transform(positionen: Position[], filter: string): Position[] {
    if (!positionen || !filter) {
      return positionen;
    }

    return positionen.filter(positionen => positionen.positionskategorie.positionskategoriename.toLowerCase().indexOf(filter.toLowerCase())>-1);
  }


}
