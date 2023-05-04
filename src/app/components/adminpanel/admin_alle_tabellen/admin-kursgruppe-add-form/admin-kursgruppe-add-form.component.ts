import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { KurseService } from 'src/app/services/kurse.service';

import { Kursgruppe } from 'src/app/interfaces/kursgruppe';
import { Kurs } from 'src/app/interfaces/kurs';

@Component({
  selector: 'app-admin-kursgruppe-add-form',
  templateUrl: './admin-kursgruppe-add-form.component.html',
  styleUrls: ['./admin-kursgruppe-add-form.component.css']
})
export class AdminKursgruppeAddFormComponent implements OnInit {

  kursgruppeAddForm!: FormGroup;
  kursgruppe: Kursgruppe;
  allKurse: Kurs[] = [];

  kursgruppeHinzugefuegt = false;
  kursreihenfolgeUnique = true;
  moreThanTwoKurse = false;
  removeKursPressed = false;

  constructor(
    private kurseService: KurseService,
    private location: Location
  ) {
    this.kursgruppe = {
    } as Kursgruppe;

  }

  ngOnInit(): void {
    this.kursgruppeAddForm = new FormGroup({
      kursgruppenname: new FormControl(this.kursgruppe.kursgruppenname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]),
      kurse: new FormArray([
        new FormControl(null,
          Validators.required),
        new FormControl(null,
          Validators.required)],
        Validators.required)
    });
    this.getData();
  }

  get kursgruppenname() {
    return this.kursgruppeAddForm.get('kursgruppenname')!;
  }

  get kurse() {
    return this.kursgruppeAddForm.get('kurse') as FormArray;
  }

  /**
  * Holt alle Kurse via Kursservice
  */
  getData() {
    this.kurseService.getAllKurse().subscribe(kurse => this.allKurse = kurse);
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
    this.kursgruppeAddForm.reset();
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
  * Kontrolliert ob Kurse mehrmals in der Reihenfolge auftauchen
  * @returns true falls mehrmals, false falls nicht
  */
  checkKursreihenfolgeUnique(arr: any[]) {
    return arr.length === new Set(arr).size;
  }

  /**
  * Parst Daten (Kurse) aus dem Formular in Objecte für die Datenabspeicherung um
  * Überprüft ob die Kursreihenfolge mind. zwei Elemente hat und keine Wiederholungen auftauchen
  * Falls alle ok, wird die neue Kursgruppe via Kursservice abgespeichert
  */
  onSubmit() {
    this.removeKursPressed = false;
    if (this.checkKursreihenfolgeUnique(this.kursgruppeAddForm.value.kurse)) {
      this.kursreihenfolgeUnique = true;
      const selectedKurse = this.kursgruppeAddForm.value.kurse;
      this.kursgruppeAddForm.value.kurse = [];
      selectedKurse.forEach((kurs: string) => {
        this.kursgruppeAddForm.value.kurse.push(this.allKurse.find(kursAll => kursAll.kursname == kurs));
      });
      this.kursgruppe.kursgruppenname = this.kursgruppeAddForm.value.kursgruppenname;
      this.kursgruppe.kursreihenfolge = this.kursgruppeAddForm.value.kurse;
      this.kurseService.addKursgruppe(this.kursgruppe).subscribe((data: any) => {
        this.kursgruppe.id = data.insertId;
        this.kursgruppeHinzugefuegt = true;
        var count = 0;
        this.kursgruppe.kursreihenfolge.forEach(element => {
          count++;
          this.kurseService.addKurse_Gruppe(element.id, count, this.kursgruppe).subscribe((data1: any) => {
          });
        });
      });
    } else {
      this.kursreihenfolgeUnique = false;
    }

  }
  
  /**
  * Geht zur Adminseite zurück
  */
  goBack() {
    this.location.back();
  }

}
