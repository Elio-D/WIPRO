import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

import { Position } from 'src/app/interfaces/position';
import { Positionskategorie } from 'src/app/interfaces/positionskategorie';
import { Kompetenz } from 'src/app/interfaces/kompetenz';

import { KompetenzenService } from 'src/app/services/kompetenzen.service';
import { PositionenService } from 'src/app/services/positionen.service';


function minSelectedCheckboxes(min = 1) {
  const myValidator: ValidatorFn = (control: AbstractControl) => {
    const formArray = control as FormArray;
    const totalSelected = formArray.controls
      .map((control) => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);
    return totalSelected >= min ? null : { required: true };
  };

  return myValidator;
}


@Component({
  selector: 'app-admin-position-add-form',
  templateUrl: './admin-position-add-form.component.html',
  styleUrls: ['./admin-position-add-form.component.css']
})
export class AdminPositionAddFormComponent implements OnInit {

  positionAddForm!: FormGroup;
  position: Position;

  allPositionen: Position[] = [];
  allPositionskategorien: Positionskategorie[] = [];
  allKompetenzen: Kompetenz[] = []

  positionHinzugefuegt = false;

  constructor(
    private positionenService: PositionenService,
    private kompetenzenService: KompetenzenService,
    private location: Location
  ) {
    this.position = {
      passend_zu_branche: 1
    } as Position;
  }

  ngOnInit(): void {
    this.positionAddForm = new FormGroup({
      positionsname: new FormControl(this.position.positionsname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),

      ]),
      positionskategorie: new FormControl(this.position.positionskategorie, [
        Validators.required
      ]),
      positionsbeschreibung: new FormControl(this.position.positionsbeschreibung, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000),
      ]),
      positionskompetenzen: new FormArray([], minSelectedCheckboxes()),
      passend_zu_branche: new FormControl(this.position.passend_zu_branche, [
        Validators.required
      ]),
    });

    this.getData();
  }

  get positionsname() {
    return this.positionAddForm.get('positionsname')!;
  }

  get positionskategorie() {
    return this.positionAddForm.get('positionskategorie')!;
  }
  get positionsbeschreibung() {
    return this.positionAddForm.get('positionsbeschreibung')!;
  }

  get positionskompetenzen() {
    return this.positionAddForm.get('positionskompetenzen') as FormArray;
  }

  get passend_zu_branche() {
    return this.positionAddForm.get('passend_zu_branche')!;
  }

  /**
  * Fügt zu jeder Kompetenz eine Checkbox für das Formular hinzu. 
  * In Form eines neuen FormControls.
  */
  private addCheckboxes() {
    this.allKompetenzen.forEach(() => this.positionskompetenzen.push(new FormControl(this.position.positionskompetenzen)));
  }

  /**
  * Holt alle Positionen, Positonskategorien und Kompetenzen via Positions- und Kompetenzenservice
  */
  getData() {
    this.positionenService.getAllPositionen().subscribe(positionen => this.allPositionen = positionen);
    this.positionenService.getAllPositionskateogrien().subscribe(positionskategorie => this.allPositionskategorien = positionskategorie);
    this.kompetenzenService.getAllKompetenzen().subscribe((kompetenzen) => {
      this.allKompetenzen = kompetenzen
      this.addCheckboxes();
    });
  }

  /**
  * Parst Daten (Positionskategorie & Kompetenzen & Passend zu Branche) aus dem Formular in Objecte für die Datenabspeicherung um
  * und speichert neue Position via Positionservice ab
  */
  onSubmit() {
    const selectedPositionskategorie = this.positionAddForm.value.positionskategorie;
    this.positionAddForm.value.positionskategorie = this.allPositionskategorien.find(kategorie => kategorie.positionskategoriename == selectedPositionskategorie);

    const selectedKompetenzen = this.positionAddForm.value.positionskompetenzen;
    this.positionAddForm.value.positionskompetenzen = [];
    selectedKompetenzen.forEach((element: boolean, index: number) => {
      if (element == true) {
        this.positionAddForm.value.positionskompetenzen.push(this.allKompetenzen[index])
      }
    });

    this.position.positionsname = this.positionAddForm.value.positionsname;
    this.position.positionskategorie = this.positionAddForm.value.positionskategorie;
    this.position.positionsbeschreibung = this.positionAddForm.value.positionsbeschreibung;
    this.position.positionskompetenzen = this.positionAddForm.value.positionskompetenzen;
    if (this.positionAddForm.value.passend_zu_branche) {
      this.position.passend_zu_branche = 1;
    } else {
      this.position.passend_zu_branche = 0;
    }
    this.positionenService.addPosition(this.position).subscribe((data: any) => {
      this.position.id = data.insertId;
      this.positionenService.addPosition_Kat(this.position).subscribe((data1: any) => {
        this.position.positionskompetenzen.forEach(element => {
          this.positionenService.addPosition_Komp(element.id, this.position).subscribe((data: any) => {
          });
        });
      });
      this.positionHinzugefuegt = true;;
    });

  }

  goBack() {
    this.location.back();
  }
}