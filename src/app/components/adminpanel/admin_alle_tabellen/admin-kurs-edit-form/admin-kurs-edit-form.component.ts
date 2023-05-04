import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { KurseService } from 'src/app/services/kurse.service';
import { Kurs } from 'src/app/interfaces/kurs';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Kurskategorie } from 'src/app/interfaces/kurskategorie';
import { Kompetenz } from 'src/app/interfaces/kompetenz';
import { KompetenzenService } from 'src/app/services/kompetenzen.service';

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
  selector: 'app-admin-kurs-edit-form',
  templateUrl: './admin-kurs-edit-form.component.html',
  styleUrls: ['./admin-kurs-edit-form.component.css']
})
export class AdminKursEditFormComponent implements OnInit {

  kursEditForm!: FormGroup;
  kurs: Kurs;

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  itemGetsEdited = false;
  FormHasChanged = true;

  kursBearbeitet = false;

  allkurse: Kurs[] = [];
  allKurskategorien: Kurskategorie[] = [{ "id": -1, "spalte": 0, "kurskategoriename": "" }];
  allKompetenzen: Kompetenz[] = []

  constructor(
    private route: ActivatedRoute,
    private kursService: KurseService,
    private komptenzenService: KompetenzenService,
    private location: Location,
    private router: Router
  ) {
    this.kurs = {
      "kurskategorie": {
        "id": -1,
        "spalte": 0,
        "kurskategoriename": ""
      }
    } as Kurs;
  }

  ngOnInit(): void {
    this.getData();
    this.kursEditForm = new FormGroup({
      kursname: new FormControl(this.kurs.kursname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      kursbeschreibung: new FormControl(this.kurs.kursbeschreibung, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000),
      ]),
      kurskategorie: new FormControl(null, [
        Validators.required
      ]),
      kurskompetenzen_erlerndend: new FormArray([], minSelectedCheckboxes()),
      link: new FormControl(this.kurs.link, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(this.reg),
        Validators.maxLength(100),
      ]),
    });
  }

  get kursname() {
    return this.kursEditForm.get('kursname')!;
  }

  get kursbeschreibung() {
    return this.kursEditForm.get('kursbeschreibung')!;
  }

  get kurskategorie() {
    return this.kursEditForm.get('kurskategorie')!;
  }

  get kurskompetenzen_erlerndend() {
    return this.kursEditForm.get('kurskompetenzen_erlerndend') as FormArray;
  }

  get link() {
    return this.kursEditForm.get('link')!;
  }

  /**
  * Fügt zu jeder Kompetenz eine Checkbox für das Formular hinzu. 
  * In Form eines neuen FormControls. Falls die Kompetenz bereits ausgewählt wurde, ist True hinterlegt
  */
  private addCheckboxes() {
    this.kurskompetenzen_erlerndend.clear();
    this.allKompetenzen.forEach((kompetenzAllKompetenzen) => {
      if (this.kurs.kurskompetenzen_erlerndend.some(kompetenz => kompetenz.id === kompetenzAllKompetenzen.id)) {
        this.kurskompetenzen_erlerndend.push(new FormControl(true))
      } else {
        this.kurskompetenzen_erlerndend.push(new FormControl(false));
      }
    });
  }

  /**
  * Holt alle Kurse, Kurskategorien und Kompetenzen via Kurs- und Kompetenzenservice
  * Zusätzlich wird der spezifische Kurs, welche bearbeitet wird via ID in der URL geholt und
  * das Edit-Formular anhand dieser Position initialisiert
  */
  getData() {
    this.kursService.getAllKurse().subscribe(kurse => this.allkurse = kurse);
    this.kursService.getAllKurskategorien().subscribe(kurskategorie => this.allKurskategorien = kurskategorie);
    this.komptenzenService.getAllKompetenzen().subscribe((kompetenzen) => {
      this.allKompetenzen = kompetenzen
    });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kursService.getKursByID(id).subscribe((kurs) => {
      this.kurs = kurs
      this.kursEditForm = new FormGroup({
        kursname: new FormControl(this.kurs.kursname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]),
        kursbeschreibung: new FormControl(this.kurs.kursbeschreibung, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000),
        ]),
        kurskategorie: new FormControl(this.kurs.kurskategorie.kurskategoriename, [
          Validators.required
        ]),
        kurskompetenzen_erlerndend: new FormArray([], minSelectedCheckboxes()),
        link: new FormControl(this.kurs.link, [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(this.reg),
          Validators.maxLength(100),
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
  * Geht zur Adminseite zurück
  */
  goBack(): void {
    this.location.back();
  }

  /**
  * Lädt die Seite neu
  */
  reload(): void {
    window.location.reload()
  }

  /**
  * Löscht den entsprechenden Kurs per ID
  * und navigiert zur Adminseite
  */
  deleteItem(): void {
    this.kursService.deleteKurs(this.kurs.id).subscribe();
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  /**
  * (Nächste zwei Methoden) Steuern darstellung des Editformulars
  * Werden ausgeführt wenn der Button "...bearbeten" oder "Bearbeitung abbrechen" betätigt werden
  */
  editItem(): void {
    this.addCheckboxes();
    this.itemGetsEdited = true;
    this.FormHasChanged = true;
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
    const kForm = JSON.stringify(this.kursEditForm.value.kurskompetenzen_erlerndend);
    const kKurs = JSON.stringify(this.kurs.kurskompetenzen_erlerndend);
    if (kForm == kKurs) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Parst Daten (Kurskategorie & Kompetenzen) aus dem Formular in Objecte für die Datenabspeicherung um
  * Überprüft ob eine Änderung an der Kategorie vorgenommen wurde
  * Falls ja, wird der angepasste Kurs via Kursservice abgespeichert
  */
  onSubmit() {
    const selectedKurskategorie = this.kursEditForm.value.kurskategorie;
    this.kursEditForm.value.kurskategorie = this.allKurskategorien.find(kategorie => kategorie.kurskategoriename == selectedKurskategorie);

    const selectedKompetenzen = this.kursEditForm.value.kurskompetenzen_erlerndend;
    this.kursEditForm.value.kurskompetenzen_erlerndend = [];
    selectedKompetenzen.forEach((element: boolean, index: number) => {
      if (element == true) {
        this.kursEditForm.value.kurskompetenzen_erlerndend.push(this.allKompetenzen[index])
      }
    });

    if (this.kurs.kursname == this.kursEditForm.value.kursname &&
      this.kurs.kursbeschreibung == this.kursEditForm.value.kursbeschreibung &&
      this.kurs.kurskategorie.kurskategoriename == this.kursEditForm.value.kurskategorie.kurskategoriename &&
      this.kompetenzenGleich() &&
      this.kurs.link == this.kursEditForm.value.link) {
      this.FormHasChanged = false;
    } else {
      this.kurs.kursname = this.kursEditForm.value.kursname;
      this.kurs.kursbeschreibung = this.kursEditForm.value.kursbeschreibung;
      this.kurs.kurskategorie = this.kursEditForm.value.kurskategorie;
      this.kurs.kurskompetenzen_erlerndend = this.kursEditForm.value.kurskompetenzen_erlerndend;
      this.kurs.link = this.kursEditForm.value.link;
      this.kursService.updateKurs(this.kurs).subscribe((data: any) => {
        this.kursService.updateKursKat(this.kurs.id, this.kurs).subscribe((data1: any) => {
          this.kursService.deleteKursKomp(this.kurs.id).subscribe((data: any) => {
            this.kurs.kurskompetenzen_erlerndend.forEach(element => {
              this.kursService.addKurs_Komp(element.id, this.kurs).subscribe((data1: any) => {});
            });
          });
        });
        this.kursBearbeitet = true;
      });
    }

  }

}
