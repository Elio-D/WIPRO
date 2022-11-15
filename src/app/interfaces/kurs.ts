import { Kompetenz } from "./kompetenz";
import { Kurskategorie } from "./kurskategorie";

export class Kurs {

    constructor(
        public id: number,
        public kursname: string,
        public kursbeschreibung: string,
        public kurskategorie: Kurskategorie,
        public kurskompetenzen_erlerndend: Kompetenz[],
        public link: string
    ) {  }

    static parse(json: string) {
        var data = JSON.parse(json);
        console.log(data);
        

         /*return new Kurs(data.idKurs, data.Kursname, data.Kursbeschreibung, 
            new Kurskategorie(data.idKurskategorie, data.Kurskategoriename, data.Kurskategoriespalte),
             , data.Link_Buchung);*/
    }
  
  }