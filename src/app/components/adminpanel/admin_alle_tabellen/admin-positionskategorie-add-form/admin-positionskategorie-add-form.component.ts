import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PositionenService } from 'src/app/services/positionen.service';

import { Positionskategorie } from 'src/app/interfaces/positionskategorie';

@Component({
  selector: 'app-admin-positionskategorie-add-form',
  templateUrl: './admin-positionskategorie-add-form.component.html',
  styleUrls: ['./admin-positionskategorie-add-form.component.css']
})
export class AdminPositionskategorieAddFormComponent implements OnInit {

  positionskateogrieAddForm!: FormGroup;
  positionskategorie: Positionskategorie;

  constructor(
    private positionenService: PositionenService,
    private location: Location
  ) {
    this.positionskategorie = {
    } as Positionskategorie;
  }

  ngOnInit(): void {
    this.positionskateogrieAddForm = new FormGroup({
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

  spalten: number[] = [1, 2, 3, 4];

  positonskategorieHinzugefuegt = false;

  get spalte() {
    return this.positionskateogrieAddForm.get('spalte')!;
  }

  get positionskategoriename() {
    return this.positionskateogrieAddForm.get('positionskategoriename')!;
  }

  /**
  * Speichert neue Kategorie via Positionsservice ab
  */
  onSubmit() {
    this.positionskategorie.spalte = this.positionskateogrieAddForm.value.spalte;
    this.positionskategorie.positionskategoriename = this.positionskateogrieAddForm.value.positionskategoriename;
    this.positionenService.addPositionskategorie(this.positionskategorie).subscribe((data: any) => {
      this.positionskategorie.id = data.insertId;
      this.positonskategorieHinzugefuegt = true;
    });
  }

  /**
  * Geht eine Seite zurück
  */
  goBack() {
    this.location.back();
  }


}
