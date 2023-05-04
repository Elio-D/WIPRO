import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PositionenService } from 'src/app/services/positionen.service';

import { Positionskategorie } from 'src/app/interfaces/positionskategorie';

@Component({
  selector: 'app-admin-positionskategorie-edit-form',
  templateUrl: './admin-positionskategorie-edit-form.component.html',
  styleUrls: ['./admin-positionskategorie-edit-form.component.css']
})
export class AdminPositionskategorieEditFormComponent implements OnInit {

  positionskateogrieEditForm!: FormGroup;
  positionskategorie: Positionskategorie;
  
  spalten: number[] = [1, 2, 3, 4];

  positionskategorieBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;

  constructor(
    private positionenService: PositionenService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.positionskategorie = {
    } as Positionskategorie;
  }

  ngOnInit(): void {
    this.getPositionskategorie();
    this.positionskateogrieEditForm = new FormGroup({
      spalte: new FormControl(this.positionskategorie.spalte, [
        Validators.required
      ]),
      positionskategoriename: new FormControl(this.positionskategorie.positionskategoriename, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])
    });
  }

  get spalte() {
    return this.positionskateogrieEditForm.get('spalte')!;
  }

  get positionskategoriename() {
    return this.positionskateogrieEditForm.get('positionskategoriename')!;
  }

  /**
  * Holt die gewünschte Positionskategorie per ID (angegeben in der URL)
  * und initialisiert das Edit-Formular
  */
  getPositionskategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.positionenService.getPositionskateogrieByID(id)
      .subscribe((positionskategorie) => {
        this.positionskategorie = positionskategorie
        this.positionskateogrieEditForm = new FormGroup({
          spalte: new FormControl(this.positionskategorie.spalte, [
            Validators.required
          ]),
          positionskategoriename: new FormControl(this.positionskategorie.positionskategoriename, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ])
        });
      });
  }

  /**
  * Löscht die entsprechende Positionskategorie per ID
  * und navigiert zur Adminseite
  */
  deleteItem(): void {
    this.positionenService.deletePositionskategorie(this.positionskategorie.id).subscribe();
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
  * Überprüft ob eine Änderung an der Kategorie vorgenommen wurde
  * Falls ja, wird die angepasste Kategorie wie Positionsservice abgespeichert
  */
  onSubmit() {
    if (this.positionskategorie.spalte == this.positionskateogrieEditForm.value.spalte && this.positionskategorie.positionskategoriename == this.positionskateogrieEditForm.value.positionskategoriename) {
      this.FormHasChanged = false;
    } else {
      this.FormHasChanged = true;
      this.positionskategorie.spalte = this.positionskateogrieEditForm.value.spalte;
      this.positionskategorie.positionskategoriename = this.positionskateogrieEditForm.value.positionskategoriename;
      this.positionenService.updateKurskategorie(this.positionskategorie).subscribe(data => this.positionskategorieBearbeitet = true);
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

}

