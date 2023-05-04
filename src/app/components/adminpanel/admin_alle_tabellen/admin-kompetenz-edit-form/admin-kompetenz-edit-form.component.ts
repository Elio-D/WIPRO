import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Kompetenz } from 'src/app/interfaces/kompetenz';

import { KompetenzenService } from 'src/app/services/kompetenzen.service';

@Component({
  selector: 'app-admin-kompetenz-edit-form',
  templateUrl: './admin-kompetenz-edit-form.component.html',
  styleUrls: ['./admin-kompetenz-edit-form.component.css']
})
export class AdminKompetenzEditFormComponent implements OnInit {

  kompetenzEditForm!: FormGroup;
  kompetenz: Kompetenz;

  constructor(
    private kompetenzenService: KompetenzenService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.kompetenz = {
    } as Kompetenz;

  }

  ngOnInit(): void {
    this.getKompetenz();
    this.kompetenzEditForm = new FormGroup({
      kompetenzname: new FormControl(this.kompetenz.kompetenzname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])
    });
  }

  kompetenzeBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;


  get kompetenzname() {
    return this.kompetenzEditForm.get('kompetenzname')!;
  }

  /**
  * Holt die gewünschte Kompetenz per ID (angegeben in der URL)
  * und initialisiert das Edit-Formular
  */
  getKompetenz(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kompetenzenService.getKompetenzByID(id)
      .subscribe((kompetenz) => {
        this.kompetenz = kompetenz
        this.kompetenzEditForm = new FormGroup({
          kompetenzname: new FormControl(this.kompetenz.kompetenzname, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ])
        });
      });
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
  * Löscht die entsprechende Kompetenz per ID
  * und navigiert zur Adminseite
  */
  deleteItem(): void {
    console.log("Kurskategorie wurde gelöscht");
    this.kompetenzenService.deleteKompetenz(this.kompetenz.id).subscribe();
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
  * Überprüft ob eine Änderung an der Kompetenz vorgenommen wurde
  * Falls ja, wird die angepasste Kompetenz via Kompetenzservice abgespeichert
  */
  onSubmit() {
    if (this.kompetenz.kompetenzname == this.kompetenzEditForm.value.kompetenzname) {
      this.FormHasChanged = false;
    } else {
      this.FormHasChanged = true;
      this.kompetenz.kompetenzname = this.kompetenzEditForm.value.kompetenzname;
      this.kompetenzenService.updateKompetenz(this.kompetenz).subscribe(data => this.kompetenzeBearbeitet = true);
    }
  }

}
