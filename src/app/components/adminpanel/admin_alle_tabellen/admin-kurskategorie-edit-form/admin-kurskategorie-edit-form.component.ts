import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { KurseService } from 'src/app/services/kurse.service';

import { Kurskategorie } from 'src/app/interfaces/kurskategorie';

@Component({
  selector: 'app-admin-kurskategorie-edit-form',
  templateUrl: './admin-kurskategorie-edit-form.component.html',
  styleUrls: ['./admin-kurskategorie-edit-form.component.css']
})
export class AdminKurskategorieEditFormComponent implements OnInit {

  kurskateogrieEditForm!: FormGroup;
  kurskategorie: Kurskategorie;

  spalten: number[] = [1, 2, 3, 4];

  kurskategorieBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;

  constructor(
    private route: ActivatedRoute,
    private kursService: KurseService,
    private router: Router
  ) {
    this.kurskategorie = {
    } as Kurskategorie;
  }

  ngOnInit() {
    this.getKurskategorie();
    this.kurskateogrieEditForm = new FormGroup({
      spalte: new FormControl(this.kurskategorie.spalte, [
        Validators.required
      ]),
      kurskategoriename: new FormControl(this.kurskategorie.kurskategoriename, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ])
    });
  }

  get spalte() {
    return this.kurskateogrieEditForm.get('spalte')!;
  }

  get kurskategoriename() {
    return this.kurskateogrieEditForm.get('kurskategoriename')!;
  }

  /**
  * Holt die gewünschte Kurskategorie per ID (angegeben in der URL)
  * und initialisiert das Edit-Formular
  */
  getKurskategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kursService.getKurskategorieByID(id)
      .subscribe((kurskategorie) => {
        this.kurskategorie = kurskategorie
        this.kurskateogrieEditForm = new FormGroup({
          spalte: new FormControl(this.kurskategorie.spalte, [
            Validators.required
          ]),
          kurskategoriename: new FormControl(this.kurskategorie.kurskategoriename, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ])
        }

        );
      });
  }
  
  /**
  * Löscht die entsprechende Kurskategorie per ID
  * und navigiert zur Adminseite
  */
  deleteItem(): void {
    this.kursService.deleteKurskategorie(this.kurskategorie.id).subscribe();
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
  * Falls ja, wird die angepasste Kategorie wie Kursservice abgespeichert
  */
  onSubmit() {
    if (this.kurskategorie.spalte == this.kurskateogrieEditForm.value.spalte && this.kurskategorie.kurskategoriename == this.kurskateogrieEditForm.value.kurskategoriename) {
      this.FormHasChanged = false;
    } else {
      this.FormHasChanged = true;
      this.kurskategorie.spalte = this.kurskateogrieEditForm.value.spalte;
      this.kurskategorie.kurskategoriename = this.kurskateogrieEditForm.value.kurskategoriename;
      this.kursService.updateKurskategorie(this.kurskategorie).subscribe(data => this.kurskategorieBearbeitet = true);
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
