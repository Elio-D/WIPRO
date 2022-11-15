import { Kompetenz } from "./kompetenz";
import { Positionskategorie } from "./positionskategorie";

export class Position {

    constructor(
        public id: number,
        public positionsname: string,
        public positionskategorie: Positionskategorie,
        public positionsbeschreibung: string,
        public positionskompetenzen: Kompetenz[],
        public passend_zu_branche: number
    ) {  }
  
  }