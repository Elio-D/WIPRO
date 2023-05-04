import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, } from '@angular/forms';
import { Location } from '@angular/common';

import { KurseService } from 'src/app/services/kurse.service';
import { KompetenzenService } from 'src/app/services/kompetenzen.service';
import { PositionenService } from 'src/app/services/positionen.service';

import { Position } from 'src/app/interfaces/position';
import { Kurs } from 'src/app/interfaces/kurs';
import { Kompetenz } from 'src/app/interfaces/kompetenz';
import { truncate } from 'fs';

@Component({
  selector: 'app-user-qualifikationen-form',
  templateUrl: './user-qualifikationen-form.component.html',
  styleUrls: ['./user-qualifikationen-form.component.css']
})
export class UserQualifikationenFormComponent implements OnInit {

  kompetenzenFilterForm!: FormGroup;
  showresults = false;

  allPositionen: Position[] = []
  relevantPositionen: Position[] = []
  allKurse: Kurs[] = [];
  positionenFilters: Position[] = [];
  ausgewaehlteKompetenzen: Kompetenz[] = [];
  allKompetenzen: Kompetenz[] = [];
  allRelevantKompetenzenSorted: Kompetenz[] = []

  constructor(
    private positionenService: PositionenService,
    private komptenzenService: KompetenzenService,
    private kurseService: KurseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.kompetenzenFilterForm = new FormGroup({
      kompetenzen: new FormArray([])
    });
    this.getData();
  }

  get kompetenzen() {
    return this.kompetenzenFilterForm.get('kompetenzen') as FormArray;
  }

  /**
  * Holt alle Positionen, Kurse und Kompetenzen via Kurs-/Positions- und Kompetenzenservice
  */
  getData() {
    this.positionenService.getAllPositionen().subscribe(positionen => {
      this.allPositionen = positionen;
      for (let position of this.allPositionen) {
        if (position.passend_zu_branche == 1) {
          this.relevantPositionen.push(position);
        }
      }
      this.addCheckboxes();
    });
    this.kurseService.getAllKurse().subscribe(kurse => this.allKurse = kurse);
    this.komptenzenService.getAllKompetenzen().subscribe(kompetenzen => {
      this.allKompetenzen = kompetenzen
    });
  }

  /**
  * Fügt zu jeder Kompetenz eine Checkbox für den Karriereplaner hinzu. 
  * In Form eines neuen FormControls.
  */
  private addCheckboxes() {
    const allPositionskompetenzen: Kompetenz[] = []
    this.relevantPositionen.forEach(position => {
      position.positionskompetenzen.forEach(positionskompetenzen => {
        if (allPositionskompetenzen.length == 0 || !allPositionskompetenzen.some(kompetenz => kompetenz.id === positionskompetenzen.id)) {
          allPositionskompetenzen.push(positionskompetenzen)
        }
      });
    });
    this.allRelevantKompetenzenSorted = allPositionskompetenzen.sort((a, b) => {
      if (a.kompetenzname < b.kompetenzname) {
        return -1;
      }
      if (a.kompetenzname > b.kompetenzname) {
        return 1;
      }
      return 0;
    });
    this.allRelevantKompetenzenSorted.forEach((kompetenz) => {
      console.log(kompetenz);
      this.kompetenzen.push(new FormControl(false))
    });
  }

  /**
  * Filtert alle Positionen anhand der ausgewählten Kompetenzen.
  * Speichert alle Positionen im Array "positionenFilters" ab, welche mind. eine der ausgewählten Kompetenzen behinhalten.
  */
  filterPositionen() {
    this.ausgewaehlteKompetenzen = []
    const selectedKompetenzen = this.kompetenzenFilterForm.value.kompetenzen;
    selectedKompetenzen.forEach((element: boolean, index: number) => {
      if (element == true) {
        this.ausgewaehlteKompetenzen.push(this.allRelevantKompetenzenSorted[index])
      }
    });

    this.positionenFilters = [];
    this.relevantPositionen.forEach(position => {
      position.positionskompetenzen.forEach(kompetenz => {
        this.ausgewaehlteKompetenzen.forEach(auswahlKompetenz => {
          if (auswahlKompetenz.id === kompetenz.id) {
            if (!this.positionenFilters.includes(position)) {
              this.positionenFilters.push(position);
            }
          }
        });
      });
    });
  }

  /**
  * Kontrolliert ob Auswahl im Karriereplaner ein Resultat ergibt.
  */
  checkPositionNon() {
    if (this.positionenFilters.length == 0 && this.showresults == true) {
      return false;
    } else {
      return true;
    }
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
    this.filterPositionen();
  }
}
