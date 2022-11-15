import { Kurs } from "./kurs";

export class Kursgruppe {

    constructor(
        public id: number,
        public kursgruppenname: string,
        public kursreihenfolge: Kurs[]
    ) {  }
  
  }