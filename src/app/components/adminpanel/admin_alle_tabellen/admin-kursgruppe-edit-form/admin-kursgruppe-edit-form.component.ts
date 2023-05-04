import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { KurseService } from 'src/app/services/kurse.service';

import { Kursgruppe } from 'src/app/interfaces/kursgruppe';
import { Kurs } from 'src/app/interfaces/kurs';

@Component({
  selector: 'app-admin-kursgruppe-edit-form',
  templateUrl: './admin-kursgruppe-edit-form.component.html',
  styleUrls: ['./admin-kursgruppe-edit-form.component.css']
})
export class AdminKursgruppeEditFormComponent implements OnInit {

  kursgruppeEditForm!: FormGroup;
  kursgruppe: Kursgruppe;

  allKurse: Kurs[] = [];
  kurseOld: Kurs[] = [];
  kurseDeleted: Kurs[] = [];

  selectedKurs: any;

  kursgruppeBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;

  kursreihenfolgeUnique = true;
  moreThanTwoKurse = false;
  removeKursPressed = false;

  constructor(
    private route: ActivatedRoute,
    private kursService: KurseService,
    private router: Router
  ) {
    this.kursgruppe = {
      "kursgruppenname": "",
      "kursreihenfolge": [{}]
    } as Kursgruppe;
  }

  ngOnInit() {
    this.getData();
    this.kursgruppeEditForm = new FormGroup({
      kursgruppenname: new FormControl(this.kursgruppe.kursgruppenname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45)
      ]),
      kurse: new FormArray([],
        Validators.required)
    });
  }

  get kursgruppenname() {
    return this.kursgruppeEditForm.get('kursgruppenname')!;
  }

  get kurse() {
    return this.kursgruppeEditForm.get('kurse') as FormArray;
  }

  /**
  * Holt alle Kurse via Kursservice. Zusätzlich wird die spezifische Kursgruppe,
  * welche bearbeitet wird via ID in der URL geholt und
  * das Edit-Formular anhand dieser Kursgruppe initialisiert
  */
  getData(): void {
    this.kursService.getAllKurse().subscribe(kurse => {
      this.allKurse = kurse
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.kursService.getKursgruppeByID(id).subscribe((kursgruppe) => {
        this.kursgruppe = kursgruppe;
        this.kursService.getKursByGruppe(kursgruppe.id).subscribe(kurse => {
          kursgruppe.kursreihenfolge = kurse;

          this.kursgruppeEditForm = new FormGroup({
            kursgruppenname: new FormControl(this.kursgruppe.kursgruppenname, [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(45)
            ]),
            kurse: new FormArray([],
              Validators.required)
          });

          this.kursreihenfolgeUnique = true;
          this.removeKursPressed = false;
          this.kurse.clear();
          kursgruppe.kursreihenfolge.forEach(kurs => {
            this.kurse.push(new FormControl(kurs.kursname,
              Validators.required))
          });
          this.kurseOld = this.kursgruppeEditForm.value.kurse;
        });
      });
    });
  }

  /**
  * Fügt neues FormControl Element für die Kursreihenfolge hinzu
  */
  addKurs() {
    this.kursreihenfolgeUnique = true;
    this.removeKursPressed = false;
    this.kurse.push(new FormControl('',
      Validators.required));
  }

  /**
  * Entfernt entsprechendes FormControl Element aus der Kursreihenfolge
  */
  removeKurs(index: number) {
    this.kursreihenfolgeUnique = true;
    this.removeKursPressed = true;
    if (this.kurse.length <= 2) {
      this.moreThanTwoKurse = false;
      return false;
    } else {
      this.kurse.removeAt(index);
      this.moreThanTwoKurse = true;
      return true;
    }
  }

  /**
  * Setzt Formular zurück
  */
  resetForm() {
    this.kursreihenfolgeUnique = true;
    this.removeKursPressed = false;
    this.kursgruppeEditForm.reset();
  }

  /**
  * Überprüft ob Kurs aus Kursreihenfolge entfernt werden darf
  * @returns true falls i.O., false falls nicht
  */
  checkKursRemoveOK() {
    if (!this.moreThanTwoKurse && this.removeKursPressed) {
      return false;
    } else {
      return true;
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
  * Löscht die entsprechende Kursgruppe per ID
  * und navigiert zur Adminseite
  */
  deleteItem(): void {
    this.kursService.deleteKursgruppe(this.kursgruppe.id).subscribe();
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  /**
  * (Nächste zwei Methoden) Steuern darstellung des Editformulars
  * Werden ausgeführt wenn der Button "...bearbeten" oder "Bearbeitung abbrechen" betätigt werden
  */
  editItem(): void {
    this.itemGetsEdited = true;
    this.FormHasChanged = true;
  }

  exitEdit(): void {
    this.itemGetsEdited = false;
    this.FormHasChanged = false;
  }

  /**
  * Kontrolliert ob Kurse mehrmals in der Reihenfolge auftauchen
  * @returns true falls mehrmals, false falls nicht
  */
  checkKursreihenfolgeUnique(arr: any[]) {
    return arr.length === new Set(arr).size;
  }

  /**
  * Kontrolliert ob die Kursreihenfolge mit der initialsen Kursgruppe übereinstimmt
  * @returns true falls gleich, false falls nicht
  */
  kursGleich(selectedKurs: any[], oldKurs: any[]): boolean {
    const kForm = JSON.stringify(selectedKurs);
    const kKurs = JSON.stringify(oldKurs);
    if (kForm == kKurs) {
      return true;
    } else {
      return false;
    }
  }

  /**
  * Parst Daten (Kurse) aus dem Formular in Objecte für die Datenabspeicherung um
  * Überprüft ob eine Änderung an der Kursgruppe vorgenommen wurde, diese in der Kursreihenfolge mind.
  * zwei Elemente hat und keine Wiederholungen auftauchen
  * Falls alle ok, wird die angepasste Kursgruppe via Kursservice abgespeichert
  */
  onSubmit() {
    this.removeKursPressed = false;
    if (this.checkKursreihenfolgeUnique(this.kursgruppeEditForm.value.kurse)) {
      this.kursreihenfolgeUnique = true;
      const selectedKurs = this.kursgruppeEditForm.value.kurse;
      this.kursgruppeEditForm.value.kurse = [];
      selectedKurs.forEach((element: string) => {
        this.kursgruppeEditForm.value.kurse.push(this.allKurse.find(kurs => kurs.kursname == element))
      });

      if (this.kursgruppe.kursgruppenname == this.kursgruppeEditForm.value.kursgruppenname && this.kursGleich(this.kursgruppeEditForm.value.kurse, this.kursgruppe.kursreihenfolge)) {
        this.FormHasChanged = false;
      } else {
        this.FormHasChanged = true;
        this.kursgruppe.kursgruppenname = this.kursgruppeEditForm.value.kursgruppenname;
        this.kursgruppe.kursreihenfolge = this.kursgruppeEditForm.value.kurse;
        this.kursService.updateKursgruppe(this.kursgruppe).subscribe((data: any) => {
          this.kursService.deleteKurse_Gruppe(this.kursgruppe.id).subscribe((data: any) => {
            var count = 0;
            this.kursgruppe.kursreihenfolge.forEach(element => {
              count++;
              this.kursService.addKurse_Gruppe(element.id, count, this.kursgruppe).subscribe((data1: any) => {
              });
            });
          });
          this.kursgruppeBearbeitet = true;
        });
      }
    } else {
      this.kursreihenfolgeUnique = false;
    }

  }

}
