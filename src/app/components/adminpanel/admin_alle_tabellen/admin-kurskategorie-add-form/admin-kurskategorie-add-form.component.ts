import { Component, OnInit } from '@angular/core';
import { Kurskategorie } from 'src/app/interfaces/kurskategorie';
import { KurseService } from 'src/app/services/kurse.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-kurskategorie-add-form',
  templateUrl: './admin-kurskategorie-add-form.component.html',
  styleUrls: ['./admin-kurskategorie-add-form.component.css']
})
export class AdminKurskategorieAddFormComponent implements OnInit {

  kurskateogrieAddForm!: FormGroup;
  kurskategorie: Kurskategorie;

  constructor(
   private kurseService: KurseService,
   private location: Location
  ) {
    this.kurskategorie = {
    } as Kurskategorie;

   }

  ngOnInit(): void {
    
    this.kurskateogrieAddForm = new FormGroup({
      spalte: new FormControl(this.kurskategorie.spalte, [
        Validators.required
      ]),
      kurskategoriename: new FormControl(this.kurskategorie.kurskategoriename, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ])
    });
  }

  spalten: number[] = [1,2,3,4];

  kurskategorieHinzugefuegt = false;

  get spalte() {
    return this.kurskateogrieAddForm.get('spalte')!;
  }

  get kurskategoriename() {
    return this.kurskateogrieAddForm.get('kurskategoriename')!;
  }

onSubmit() { 
  
  this.kurskategorie.spalte = this.kurskateogrieAddForm.value.spalte;
  this.kurskategorie.kurskategoriename = this.kurskateogrieAddForm.value.kurskategoriename;
  this.kurseService.addKurskategorie(this.kurskategorie).subscribe((data: any) => {
    this.kurskategorie.id = data.insertId;
    this.kurskategorieHinzugefuegt = true;
    console.log(data.insertId);
    console.log(this.kurskategorie);
  });
  
  
}

goBack() {
  this.location.back();
}

}
