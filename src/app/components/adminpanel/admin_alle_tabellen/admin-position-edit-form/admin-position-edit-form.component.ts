import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-admin-position-edit-form',
  templateUrl: './admin-position-edit-form.component.html',
  styleUrls: ['./admin-position-edit-form.component.css']
})
export class AdminPositionEditFormComponent implements OnInit {

  positionEditForm!: FormGroup;
  position: Position;

  allPositionen: Position[] = [];
  allPositionskategorien: Positionskategorie[] = [{ "id": -1, "spalte": 0, "positionskategoriename": "" }];
  allKompetenzen: Kompetenz[] = []

  positionBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;

  constructor(
    private positionenService: PositionenService,
    private kompetenzenService: KompetenzenService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.position = {
      positionskategorie: { "id": -1, "spalte": 0, "positionskategoriename": "" },
      passend_zu_branche: 1
    } as Position;
  }

  ngOnInit(): void {
    this.positionEditForm = new FormGroup({
      positionsname: new FormControl(this.position.positionsname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),

      ]),
      positionskategorie: new FormControl(this.position.positionskategorie.positionskategoriename, [
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
    return this.positionEditForm.get('positionsname')!;
  }

  get positionskategorie() {
    return this.positionEditForm.get('positionskategorie')!;
  }
  get positionsbeschreibung() {
    return this.positionEditForm.get('positionsbeschreibung')!;
  }

  get positionskompetenzen() {
    return this.positionEditForm.get('positionskompetenzen') as FormArray;
  }

  get passend_zu_branche() {
    return this.positionEditForm.get('passend_zu_branche')!;
  }

  /**
  * Fügt zu jeder Kompetenz eine Checkbox für das Formular hinzu. 
  * In Form eines neuen FormControls. Falls die Kompetenz bereits ausgewählt wurde, ist True hinterlegt
  */
  private addCheckboxes() {
    this.positionskompetenzen.clear();
    this.allKompetenzen.forEach((kompetenzAllKompetenzen) => {
      if (this.position.positionskompetenzen.some(kompetenz => kompetenz.id === kompetenzAllKompetenzen.id)) {
        this.positionskompetenzen.push(new FormControl(true))
      } else {
        this.positionskompetenzen.push(new FormControl(false));
      }
    });
  }

  /**
  * Holt alle Positionen, Positonskategorien und Kompetenzen via Positions- und Kompetenzenservice
  * Zusätzlich wird die spezifische Position, welche bearbeitet wird via ID in der URL geholt und
  * das Edit-Formular anhand dieser Position initialisiert
  */
  getData() {
    this.positionenService.getAllPositionen().subscribe(positionen => this.allPositionen = positionen);
    this.positionenService.getAllPositionskateogrien().subscribe(positionskategorie => this.allPositionskategorien = positionskategorie);
    this.kompetenzenService.getAllKompetenzen().subscribe((kompetenzen) => {
      this.allKompetenzen = kompetenzen
    });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.positionenService.getPositionByID(id).subscribe((position) => {
      this.position = position
      this.positionEditForm = new FormGroup({
        positionsname: new FormControl(this.position.positionsname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),

        ]),
        positionskategorie: new FormControl(this.position.positionskategorie.positionskategoriename, [
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
    });
  }

  /**
  * Steuerung für Fehlermeldung, falls kein Element angepasst wurde
  * @returns True, wenn Kategorie angepasst wurde, False falls nichts angepasst wurde
  */
  controlFormChange() {
    if (this.itemGetsEdited && this.FormHasChanged) {
      return true
    } else if (this.itemGetsEdited && !this.FormHasChanged) {
      return false
    } else {
      return true
    }
  }

  /**
  * Steuerung Darstellung des Feldes "Passend zur Branche"
  * @returns "Ja"-String falls Position zu Branche passt und "Nein"-String falls nicht
  */
  showPassendZuBranche(): string {
    if (this.position.passend_zu_branche == 1) {
      return "Ja"
    } else {
      return "Nein"
    }
  }

  /**
  * Geht zur Adminseite zurück
  */
  goBack(): void {
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  /**
  * Lädt die Seite neu
  */
  reload(): void {
    window.location.reload()
  }

  /**
  * Löscht die entsprechende Position per ID
  * und navigiert zur Adminseite
  */
  deleteItem(): void {
    this.positionenService.deletePosition(this.position.id).subscribe();
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  /**
  * (Nächste zwei Methoden) Steuern darstellung des Editformulars
  * Werden ausgeführt wenn der Button "...bearbeten" oder "Bearbeitung abbrechen" betätigt werden
  */
  editItem(): void {
    this.itemGetsEdited = true;
    this.FormHasChanged = true;
    this.addCheckboxes();
  }

  exitEdit(): void {
    this.itemGetsEdited = false;
    this.FormHasChanged = false;
  }

  /**
  * Kontrolliert ob ausgewählte Kompetenzen gleich wie initiale Kompetenzen sind
  * @returns true falls gleicher string, false falls nicht
  */
  kompetenzenGleich(): boolean {
    const kForm = JSON.stringify(this.positionEditForm.value.positionskompetenzen);
    const kKurs = JSON.stringify(this.position.positionskompetenzen);
    if (kForm == kKurs) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Parst Daten (Positionskategorie & Kompetenzen & Passend zu Branche) aus dem Formular in Objecte für die Datenabspeicherung um
  * Überprüft ob eine Änderung an der Kategorie vorgenommen wurde
  * Falls ja, wird die angepasste Position via Positionsservice abgespeichert
  */
  onSubmit() {
    const selectedPositionskategorie = this.positionEditForm.value.positionskategorie;
    this.positionEditForm.value.positionskategorie = this.allPositionskategorien.find(kategorie => kategorie.positionskategoriename == selectedPositionskategorie);

    const selectedKompetenzen = this.positionEditForm.value.positionskompetenzen;
    this.positionEditForm.value.positionskompetenzen = [];
    selectedKompetenzen.forEach((element: boolean, index: number) => {
      if (element == true) {
        this.positionEditForm.value.positionskompetenzen.push(this.allKompetenzen[index])
      }
    });

    const selectedPassend_zu_Branche = this.positionEditForm.value.passend_zu_branche;
    if (this.positionEditForm.value.passend_zu_branche) {
      this.positionEditForm.value.passend_zu_branche = 1;
    } else {
      this.positionEditForm.value.passend_zu_branche = 0;
    }

    if (this.position.positionsname == this.positionEditForm.value.positionsname &&
      this.position.positionsbeschreibung == this.positionEditForm.value.positionsbeschreibung &&
      this.position.positionskategorie.positionskategoriename == this.positionEditForm.value.positionskategorie.positionskategoriename &&
      this.kompetenzenGleich() &&
      this.position.passend_zu_branche == this.positionEditForm.value.link) {
      this.FormHasChanged = false;
    } else {
      this.position.positionsname = this.positionEditForm.value.positionsname;
      this.position.positionskategorie = this.positionEditForm.value.positionskategorie;
      this.position.positionsbeschreibung = this.positionEditForm.value.positionsbeschreibung;
      this.position.positionskompetenzen = this.positionEditForm.value.positionskompetenzen;
      this.position.passend_zu_branche = this.positionEditForm.value.passend_zu_branche;

      this.positionenService.updatePosition(this.position).subscribe((data: any) => {
        this.positionenService.updatePositionKat(this.position.id, this.position).subscribe((data1: any) => {
          this.positionenService.deletePositionKomp(this.position.id).subscribe((data: any) => {
            this.position.positionskompetenzen.forEach(element => {
              this.positionenService.addPosition_Komp(element.id, this.position).subscribe((data1: any) => {});
            });
          });
        });
        this.positionBearbeitet = true;
      });
    }

  }

}