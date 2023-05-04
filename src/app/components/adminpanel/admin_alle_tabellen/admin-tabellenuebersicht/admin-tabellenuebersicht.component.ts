import { Component, OnInit } from '@angular/core';

import { KurseService } from 'src/app/services/kurse.service';
import { PositionenService } from 'src/app/services/positionen.service';
import { KompetenzenService } from 'src/app/services/kompetenzen.service';

import { Kurs } from 'src/app/interfaces/kurs';
import { Kurskategorie } from 'src/app/interfaces/kurskategorie';
import { Position } from 'src/app/interfaces/position';
import { Positionskategorie } from 'src/app/interfaces/positionskategorie';
import { Kompetenz } from 'src/app/interfaces/kompetenz';
import { Kursgruppe } from 'src/app/interfaces/kursgruppe';

@Component({
  selector: 'app-admin-tabellenuebersicht',
  templateUrl: './admin-tabellenuebersicht.component.html',
  styleUrls: ['./admin-tabellenuebersicht.component.css']
})
export class AdminTabellenuebersichtComponent implements OnInit {

  kurse: Kurs[] = [];
  ersteKurse: Kurs[] = [];
  alleAnderenKurse: Kurs[] = [];

  kurskategorien: Kurskategorie[] = [];
  ersteKurskategorien: Kurskategorie[] = [];
  alleAnderenKurskategorien: Kurskategorie[] = [];

  positionen: Position[] = [];
  erstePositionen: Position[] = [];
  alleAnderenPositionen: Position[] = [];

  positionskategorien: Positionskategorie[] = [];
  erstePositionskategorien: Positionskategorie[] = [];
  alleAnderenPositionskategorien: Positionskategorie[] = [];

  kompetenzen: Kompetenz[] = [];
  ersteKompetenzen: Kompetenz[] = [];
  alleAnderenKompetenzen: Kompetenz[] = [];

  kursgruppen: Kursgruppe[] = [];
  ersteKursgruppen: Kursgruppe[] = [];
  alleAnderenKursgruppen: Kursgruppe[] = [];

  mehrAnzeigenKurse = false;
  buttonMehrKurseAnzeigen = false;
  buttonWenigerKurseAnzeigen = false;

  mehrAnzeigenKurskategorien = false;
  buttonMehrKurskategorienAnzeigen = false;
  buttonWenigerKurskategorienAnzeigen = false;

  mehrAnzeigenPositionen = false;
  buttonMehrPositionenAnzeigen = false;
  buttonWenigerPositionenAnzeigen = false;

  mehrAnzeigenPositionskategorien = false;
  buttonMehrPositionskategorienAnzeigen = false;
  buttonWenigerPositionskategorienAnzeigen = false;

  mehrAnzeigenKompetenzen = false;
  buttonMehrKompetenzenAnzeigen = false;
  buttonWenigerKompetenzenAnzeigen = false;

  mehrAnzeigenKursgruppen = false;
  buttonMehrKursgruppenAnzeigen = false;
  buttonWenigerKursgruppenAnzeigen = false;

  anzeigeAb = 4;

  constructor(
    private kurseService: KurseService,
    private positionenService: PositionenService,
    private komptenzenService: KompetenzenService
  ) { }

  ngOnInit(): void {
    this.getAllKurse();
    this.getAllKurskategorien();
    this.getAllPositionen();
    this.getAllPositonskategorien();
    this.getAllKompetenzen();
    this.getAllKursgruppen();
    this.getAllKurskategorien();
  }

  /**
  * Holt alle Kurse aus der Datenbank via Kursservice und teilt 
  * diese in jeweils zwei Arrays. Diejenigen Kurse die immer angezeigt werden
  * und in diejenigen Kurse die erst mit dem Button "Mehr Anzeigen" dargestellt werden sollen.
  */
  getAllKurse() {
    this.kurseService.getAllKurse().subscribe((kurse) => {
      this.kurse = kurse;
      if (this.kurse.length > this.anzeigeAb) {
        this.ersteKurse = this.kurse.slice(0, this.anzeigeAb);
        this.alleAnderenKurse = this.kurse.slice(this.anzeigeAb);
        this.buttonMehrKurseAnzeigen = true;
      } else {
        this.ersteKurse = this.kurse;
      }
    });
  }

  /**
  * Holt alle Kurskategorien aus der Datenbank via Kursservice und teilt 
  * diese in jeweils zwei Arrays. Diejenigen Kurskategorien die immer angezeigt werden
  * und in diejenigen Kurskategorien die erst mit dem Button "Mehr Anzeigen" dargestellt werden sollen.
  */
  getAllKurskategorien() {
    this.kurseService.getAllKurskategorien().subscribe((kurskategorien) => {
      this.kurskategorien = kurskategorien
      this.kurskategorien = kurskategorien;
      if (this.kurskategorien.length > this.anzeigeAb) {
        this.ersteKurskategorien = this.kurskategorien.slice(0, this.anzeigeAb);
        this.alleAnderenKurskategorien = this.kurskategorien.slice(this.anzeigeAb);
        this.buttonMehrKurskategorienAnzeigen = true;
      } else {
        this.ersteKurskategorien = this.kurskategorien;
      }
    });
  }

  /**
  * Holt alle Positionen aus der Datenbank via Positionsservice und teilt 
  * diese in jeweils zwei Arrays. Diejenigen Positionen die immer angezeigt werden
  * und in diejenigen Positionen die erst mit dem Button "Mehr Anzeigen" dargestellt werden sollen.
  */
  getAllPositionen() {
    this.positionenService.getAllPositionen().subscribe((positionen) => {
      this.positionen = positionen
      if (this.positionen.length >= this.anzeigeAb) {
        this.erstePositionen = this.positionen.slice(0, this.anzeigeAb);
        this.alleAnderenPositionen = this.positionen.slice(this.anzeigeAb);
        this.buttonMehrPositionenAnzeigen = true;
      } else {
        this.erstePositionen = this.positionen;
      }
    });
  }

  /**
  * Holt alle Positonskategorien aus der Datenbank via Positionsservice und teilt 
  * diese in jeweils zwei Arrays. Diejenigen Positonskategorien die immer angezeigt werden
  * und in diejenigen Positonskategorien die erst mit dem Button "Mehr Anzeigen" dargestellt werden sollen.
  */
  getAllPositonskategorien() {
    this.positionenService.getAllPositionskateogrien().subscribe((positionskategorien) => {
      this.positionskategorien = positionskategorien
      if (this.positionskategorien.length >= this.anzeigeAb) {
        this.erstePositionskategorien = this.positionskategorien.slice(0, this.anzeigeAb);
        this.alleAnderenPositionskategorien = this.positionskategorien.slice(this.anzeigeAb);
        this.buttonMehrPositionskategorienAnzeigen = true;
      } else {
        this.erstePositionskategorien = this.positionskategorien;
      }
    });
  }

  /**
  * Holt alle Kompetenzen aus der Datenbank via Kompetenzenservice und teilt 
  * diese in jeweils zwei Arrays. Diejenigen Kompetenzen die immer angezeigt werden
  * und in diejenigen Kompetenzen die erst mit dem Button "Mehr Anzeigen" dargestellt werden sollen.
  */
  getAllKompetenzen() {
    this.komptenzenService.getAllKompetenzen().subscribe((kompetenzen) => {
      this.kompetenzen = kompetenzen
      if (this.kompetenzen.length >= this.anzeigeAb) {
        this.ersteKompetenzen = this.kompetenzen.slice(0, this.anzeigeAb);
        this.alleAnderenKompetenzen = this.kompetenzen.slice(this.anzeigeAb);
        this.buttonMehrKompetenzenAnzeigen = true;
      } else {
        this.ersteKompetenzen = this.kompetenzen;
      }
    });
  }

  /**
  * Holt alle Kursgruppen aus der Datenbank via Kursservice und teilt 
  * diese in jeweils zwei Arrays. Diejenigen Kursgruppen die immer angezeigt werden
  * und in diejenigen Kursgruppen die erst mit dem Button "Mehr Anzeigen" dargestellt werden sollen.
  */
  getAllKursgruppen() {
    this.kurseService.getAllKursgruppen().subscribe((kursgruppen) => {
      this.kursgruppen = kursgruppen
      if (this.kursgruppen.length > this.anzeigeAb) {
        this.ersteKursgruppen = this.kursgruppen.slice(0, this.anzeigeAb);
        this.alleAnderenKursgruppen = this.kursgruppen.slice(this.anzeigeAb);
        this.buttonMehrKursgruppenAnzeigen = true;
      } else {
        this.ersteKursgruppen = this.kursgruppen;
      }
    });
  }

  /**
  * (Nächste zwei) Führ Steuerung der "Mehr anzeigen" / "Weniger Anzeigen" Buttons in der Tabelle Kurse
  */
  mehrAnzeigenKurseKlicked() {
    this.buttonWenigerKurseAnzeigen = true;
    this.buttonMehrKurseAnzeigen = false;
  }

  wenigerAnzeigenKurseKlicked() {
    this.buttonWenigerKurseAnzeigen = false;
    this.buttonMehrKurseAnzeigen = true;
  }

  /**
  * (Nächste zwei) Führ Steuerung der "Mehr anzeigen" / "Weniger Anzeigen" Buttons in der Tabelle Kurskategorien
  */
  mehrAnzeigenKurskategorienKlicked() {
    this.buttonWenigerKurskategorienAnzeigen = true;
    this.buttonMehrKurskategorienAnzeigen = false;
  }

  wenigerAnzeigenKurskategorienKlicked() {
    this.buttonWenigerKurskategorienAnzeigen = false;
    this.buttonMehrKurskategorienAnzeigen = true;
  }

  /**
  * (Nächste zwei) Führ Steuerung der "Mehr anzeigen" / "Weniger Anzeigen" Buttons in der Tabelle Kursgruppen
  */
  mehrAnzeigenKursgruppenKlicked() {
    this.buttonWenigerKursgruppenAnzeigen = true;
    this.buttonMehrKursgruppenAnzeigen = false;
  }

  wenigerAnzeigenKursgruppenKlicked() {
    this.buttonWenigerKursgruppenAnzeigen = false;
    this.buttonMehrKursgruppenAnzeigen = true;
  }

  /**
  * (Nächste zwei) Führ Steuerung der "Mehr anzeigen" / "Weniger Anzeigen" Buttons in der Tabelle Positionen
  */
  mehrAnzeigenPositionenKlicked() {
    this.buttonWenigerPositionenAnzeigen = true;
    this.buttonMehrPositionenAnzeigen = false;
  }

  wenigerAnzeigenPositionenKlicked() {
    this.buttonWenigerPositionenAnzeigen = false;
    this.buttonMehrPositionenAnzeigen = true;
  }

  /**
  * (Nächste zwei) Führ Steuerung der "Mehr anzeigen" / "Weniger Anzeigen" Buttons in der Tabelle Positonskateogrien
  */
  mehrAnzeigenPositionskategorienKlicked() {
    this.buttonWenigerPositionskategorienAnzeigen = true;
    this.buttonMehrPositionskategorienAnzeigen = false;
  }

  wenigerAnzeigenPositionskategorienKlicked() {
    this.buttonWenigerPositionskategorienAnzeigen = false;
    this.buttonMehrPositionskategorienAnzeigen = true;
  }

  /**
  * (Nächste zwei) Führ Steuerung der "Mehr anzeigen" / "Weniger Anzeigen" Buttons in der Tabelle Kompetenzen
  */
  mehrAnzeigenKompetenzenKlicked() {
    this.buttonWenigerKompetenzenAnzeigen = true;
    this.buttonMehrKompetenzenAnzeigen = false;
  }

  wenigerAnzeigenKompetenzenKlicked() {
    this.buttonWenigerKompetenzenAnzeigen = false;
    this.buttonMehrKompetenzenAnzeigen = true;
  }

}
