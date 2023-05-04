import { Pipe, PipeTransform } from '@angular/core';
import { Kurs } from 'src/app/interfaces/kurs';

@Pipe({
  name: 'filterKurs'
})
export class FilterKursPipe implements PipeTransform {

  transform(kurse: Kurs[], filter: string): Kurs[] {
    if (!kurse || !filter) {
      return kurse;
    }
    return kurse.filter(kurs => kurs.kurskategorie.kurskategoriename.toLowerCase().indexOf(filter.toLowerCase()) > -1);
  }

}
