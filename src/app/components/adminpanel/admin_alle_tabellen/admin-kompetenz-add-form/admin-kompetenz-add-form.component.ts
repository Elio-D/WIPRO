import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Kompetenz } from 'src/app/interfaces/kompetenz';

import { KompetenzenService } from 'src/app/services/kompetenzen.service';

@Component({
  selector: 'app-admin-kompetenz-add-form',
  templateUrl: './admin-kompetenz-add-form.component.html',
  styleUrls: ['./admin-kompetenz-add-form.component.css']
})
export class AdminKompetenzAddFormComponent implements OnInit {

  kompetenzAddForm!: FormGroup;
  kompetenz: Kompetenz;

  constructor(
    private kompetenzenService: KompetenzenService,
    private location: Location
  ) {
    this.kompetenz = {
    } as Kompetenz;

  }

  ngOnInit(): void {
    this.kompetenzAddForm = new FormGroup({
      kompetenzname: new FormControl(this.kompetenz.kompetenzname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])
    });
  }

  kompetenzHinzugefuegt = false;

  get kompetenzname() {
    return this.kompetenzAddForm.get('kompetenzname')!;
  }

  /**
  * Speichert neue Kompetenz via Kompetenzservice ab
  */
  onSubmit() {
    this.kompetenz.kompetenzname = this.kompetenzAddForm.value.kompetenzname;
    this.kompetenzenService.addKompetenz(this.kompetenz).subscribe((data: any) => {
      this.kompetenz.id = data.insertId;
      this.kompetenzHinzugefuegt = true;
      console.log(data.insertId);
      console.log(this.kompetenz);
    });
  }

  /**
  * Geht eine Seite zurück
  */
  goBack() {
    this.location.back();
  }

}
