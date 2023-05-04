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
  
  }