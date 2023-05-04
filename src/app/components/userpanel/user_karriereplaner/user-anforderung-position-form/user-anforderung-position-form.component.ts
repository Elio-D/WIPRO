import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, } from '@angular/forms';
import { Location } from '@angular/common';

import { KurseService } from 'src/app/services/kurse.service';
import { KompetenzenService } from 'src/app/services/kompetenzen.service';
import { PositionenService } from 'src/app/services/positionen.service';
import { Kursgruppe } from 'src/app/interfaces/kursgruppe';

import { Position } from 'src/app/interfaces/position';
import { Kurs } from 'src/app/interfaces/kurs';
import { Kompetenz } from 'src/app/interfaces/kompetenz';

@Component({
  selector: 'app-user-anforderung-position-form',
  templateUrl: './user-anforderung-position-form.component.html',
  styleUrls: ['./user-anforderung-position-form.component.css']
})
export class UserAnforderungPositionFormComponent implements OnInit {

  kompetenzenFilterForm!: FormGroup;
  showresults = false;
  showresultsAlleKurse = true;
  showresultsKursweg = false;

  allPositionen: Position[] = [{
    "id": -1,
    "positionsname": "",
    "positionskategorie": { "id": -1, "positionskategoriename": "", "spalte": 0 },
    "positionsbeschreibung": "",
    "positionskompetenzen": [],
    "passend_zu_branche": 0
  }];
  relevantPositionen: Position[] = [];
  allKurse: Kurs[] = [];
  allKursgruppen: Kursgruppe[] = [];
  kurseFilters: Kurs[] = [];
  kursgruppenFilters: Kursgruppe[] = [];
  ausgewaehlteKompetenzen: Kompetenz[] = [];
  ausgewaehltePosition: Position = {
    "id": -1,
    "positionsname": "",
    "positionskategorie": { "id": -1, "positionskategoriename": "", "spalte": 0 },
    "positionsbeschreibung": "",
    "positionskompetenzen": [],
    "passend_zu_branche": 0
  };
  allKompetenzen: Kompetenz[] = [];
  allKompetenzenSorted: Kompetenz[] = [];

  constructor(
    private positionenService: PositionenService,
    private komptenzenService: KompetenzenService,
    private kurseService: KurseService,
  ) { }

  ngOnInit(): void {
    this.kompetenzenFilterForm = new FormGroup({
      position: new FormControl(this.ausgewaehltePosition),
      kompetenzen: new FormArray([])
    });
    this.getData();
    this.getKursgruppen();
  }

  get position() {
    return this.kompetenzenFilterForm.get('position')!;
  }

  get kompetenzen() {
    return this.kompetenzenFilterForm.get('kompetenzen') as FormArray;
  }

  /**
  * Holt alle Positionen, Kurse und Kompetenzen via Kurs-/Positions- und Kompetenzenservice
  */
  getData() {
    this.positionenService.getAllPositionen().subscribe(positionen => {
      this.allPositionen = positionen
      for (let position of this.allPositionen) {
        if (position.passend_zu_branche == 1) {
          this.relevantPositionen.push(position);
        }
      }
    });
    this.kurseService.getAllKurse().subscribe(kurse => { 
      this.allKurse = kurse
      this.addCheckboxes();
     });
    this.komptenzenService.getAllKompetenzen().subscribe(kompetenzen => {
      this.allKompetenzen = kompetenzen;
    });

  }

  /**
  * Holt alle Kursgruppen via Kursservice
  */
  getKursgruppen() {
    this.kurseService.getAllKursgruppen().subscribe(kursgruppen => {
      this.allKursgruppen = kursgruppen;
      this.allKursgruppen.forEach(element => {
        this.kurseService.getKursByGruppe(element.id).subscribe(kurse => {
          element.kursreihenfolge = kurse;
        });
      });
    });
  }

  /**
  * Fügt zu jeder Kompetenz eine Checkbox für den Karriereplaner hinzu. 
  * In Form eines neuen FormControls.
  * Prüft ob bereits eine Wunschposition ausgewählt wurde. 
  * Falls Ja, werden dazugehörige Kompetenzen bereits ausgewählt.
  */
  private addCheckboxes() {
    this.kompetenzen.clear();
    const allKurskompetenzen: Kompetenz[] = []
    this.allKurse.forEach(kurs => {
      kurs.kurskompetenzen_erlerndend.forEach(kursskompetenzen => {
        if (allKurskompetenzen.length == 0 || !allKurskompetenzen.some(kompetenz => kompetenz.id === kursskompetenzen.id)) {
          allKurskompetenzen.push(kursskompetenzen)
        }
      });
    });
    this.allKompetenzenSorted = allKurskompetenzen.sort((a, b) => {
      if (a.kompetenzname < b.kompetenzname) {
        return -1;
      }
      if (a.kompetenzname > b.kompetenzname) {
        return 1;
      }
      return 0;
    });
    this.allKompetenzenSorted.forEach((kompetenzAllKompetenzen) => {
      if (this.ausgewaehltePosition.id === -1) {
        this.kompetenzen.push(new FormControl(false))
      } else if (this.ausgewaehltePosition.positionskompetenzen.some(kompetenz => kompetenz.id === kompetenzAllKompetenzen.id)) {
        this.kompetenzen.push(new FormControl(true))
      } else {
        this.kompetenzen.push(new FormControl(false));
      }
    });

  }

  /**
  * Filtert alle Kurse anhand der ausgewählten Kompetenzen.
  * Sortiert diese alphabetisch und speichert alle Kurse im Array "kurseFilters" ab,
  * welche mind. eine der ausgewählten Kompetenzen behinhalten.
  */
  filterKurse() {
    this.ausgewaehlteKompetenzen = []
    const selectedKompetenzen = this.kompetenzenFilterForm.value.kompetenzen;
    selectedKompetenzen.forEach((element: boolean, index: number) => {
      if (element == true) {
        this.ausgewaehlteKompetenzen.push(this.allKompetenzenSorted[index])
      }
    });
    this.kurseFilters = [];
    var kurseUnsortedFilters: Kurs[] = []
    this.allKurse.forEach(kurs => {
      kurs.kurskompetenzen_erlerndend.forEach(kompetenz => {
        this.ausgewaehlteKompetenzen.forEach(auswahlKompetenz => {
          if (auswahlKompetenz.id === kompetenz.id) {
            if (!kurseUnsortedFilters.includes(kurs)) {
              kurseUnsortedFilters.push(kurs);
            }
          }
        });
      });

      this.kurseFilters = kurseUnsortedFilters.sort((a, b) => {
        if (a.kursname < b.kursname) {
          return -1;
        }
        if (a.kursname > b.kursname) {
          return 1;
        }
        return 0;
      });
    });
  }

  /**
  * Filtert alle Kursgruppen anhand der ausgewählten Kompetenzen.
  * Sortiert diese alphabetisch und speichert alle Kursgruppen im Array "kursgruppenFilters" ab,
  * welche alle ausgewählten Kompetenzen behinhalten.
  */
  filterKursgruppen() {
    this.ausgewaehlteKompetenzen = []

    const selectedKompetenzen = this.kompetenzenFilterForm.value.kompetenzen;
    selectedKompetenzen.forEach((element: boolean, index: number) => {
      if (element == true) {
        this.ausgewaehlteKompetenzen.push(this.allKompetenzenSorted[index])
      }
    });

    this.kursgruppenFilters = [];
    var kursegruppenUnsortedFiltersAll: Kursgruppe[] = []
    this.allKursgruppen.forEach(kursgruppe => {
      var alleKompetenzenfromgruppe: Kompetenz[] = []
      kursgruppe.kursreihenfolge.forEach(kurs => {
        kurs.kurskompetenzen_erlerndend.forEach(kompetenz => {
          alleKompetenzenfromgruppe.push(kompetenz);
        });
      });
      var ausgewaehlteKompetenzenBoolean: boolean[] = []
      for (let index = 0; index < this.ausgewaehlteKompetenzen.length; index++) {
        ausgewaehlteKompetenzenBoolean.push(false);
      }
      this.ausgewaehlteKompetenzen.forEach((kompetenz, i) => {
        alleKompetenzenfromgruppe.forEach(kompetenzAll => {
          if (kompetenz.id == kompetenzAll.id) {
            ausgewaehlteKompetenzenBoolean[i] = true;
          }
        });
      });
      if (ausgewaehlteKompetenzenBoolean.every(element => element == true)) {
        kursegruppenUnsortedFiltersAll.push(kursgruppe)
      }
    });

    this.kursgruppenFilters = kursegruppenUnsortedFiltersAll.sort((a, b) => {
      if (a.kursgruppenname < b.kursgruppenname) {
        return -1;
      }
      if (a.kursgruppenname > b.kursgruppenname) {
        return 1;
      }
      return 0;
    });
  }

  /**
  * Kontrolliert ob Auswahl im Karriereplaner ein Resultat ergibt.
  */
  checkKursNon() {
    if (this.kurseFilters.length == 0 && this.showresults == true) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * Kontrolliert ob Auswahl im Karriereplaner ein Resultat ergibt.
  */
  checkKurswegNon() {
    if (this.kursgruppenFilters.length == 0 && this.showresults == true) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * (Nächste zwei Methoden) Zeigen Inhalte für Kursempfehlung oder Kursgruppenempfehlung an
   * Werden getriggert, sobald jemand die Buttons "Alle Kurse" oder "Kursweg" betätigt
   */
  showAlleKurse() {
    this.showresultsAlleKurse = true;
    this.showresultsKursweg = false;
  }

  showKursweg() {
    this.showresultsAlleKurse = false;
    this.showresultsKursweg = true;
  }

  /**
   * Wählt Kompetenzen gemäss Wunschposition aus.
   * Wird ausgeführt, sobald eine Wunschposition beim Dropdown gewählt wurde.
   */
  changePosition() {
    this.ausgewaehltePosition = this.kompetenzenFilterForm.value.position;
    this.addCheckboxes();
    this.onSubmit();
  }

  /**
  * Kontrolliert ob Kompetenz ausgewählt wurde.
  * Wird anschliessend genutzt um ausgewählte Kompetenzen im Karriereplaner orange zu markieren
  * @param kurskompetenz Kompetenz, welche geprüft werden soll, ob diese im Formular ausgewählt wurde
  */
  checkAusgewaehlt(kurskompetenz: Kompetenz) {
    return this.ausgewaehlteKompetenzen.some(kompetenz => kompetenz.id === kurskompetenz.id)
  }

  /**
  * Setzt das Formular des Karriereplaner zurück.
  */
  resetForm() {
    this.kompetenzenFilterForm.reset();
    this.showresults = false;
  }

  /**
  * Führt Filterung durch und zeigt resultat an
  */
  onSubmit() {
    this.showresults = true;
    this.filterKurse();
    this.filterKursgruppen();

  }
}
