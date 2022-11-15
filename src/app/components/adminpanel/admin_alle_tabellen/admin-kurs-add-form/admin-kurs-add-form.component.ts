import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Kurs } from 'src/app/interfaces/kurs';
import { Kurskategorie } from 'src/app/interfaces/kurskategorie';
import { Kompetenz } from 'src/app/interfaces/kompetenz';
import { KurseService } from 'src/app/services/kurse.service';
import { KompetenzenService } from 'src/app/services/kompetenzen.service';
import { Location } from '@angular/common';

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
  selector: 'app-admin-kurs-add-form',
  templateUrl: './admin-kurs-add-form.component.html',
  styleUrls: ['./admin-kurs-add-form.component.css'],
  
})
export class AdminKursAddFormComponent implements OnInit {

  kursAddForm!: FormGroup;
  kurs: Kurs;

  allkurse: Kurs[] = [];
  allKurskategorien: Kurskategorie[] = [];
  allKompetenzen: Kompetenz[] = []

  kursHinzugefuegt = false;

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'

  constructor(
    private kurseService: KurseService,
    private komptenzenService: KompetenzenService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.kurs = {
    } as Kurs;
   }

  ngOnInit(): void {
    this.kursAddForm = new FormGroup({
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
      kurskategorie: new FormControl(this.kurs.kurskategorie, [
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

    this.getData();
  }

  get kursname() {
    return this.kursAddForm.get('kursname')!;
  }

  get kursbeschreibung() {
    return this.kursAddForm.get('kursbeschreibung')!;
  }

  get kurskategorie() {
    return this.kursAddForm.get('kurskategorie')!;
  }

  get kurskompetenzen_erlerndend() {
    return this.kursAddForm.get('kurskompetenzen_erlerndend') as FormArray;
  }

  get link() {
    return this.kursAddForm.get('link')!;
  }

  private addCheckboxes() {
    this.allKompetenzen.forEach(() => this.kurskompetenzen_erlerndend.push(new FormControl(this.kurs.kurskompetenzen_erlerndend)));
  }


  getData() {
    this.kurseService.getAllKurse().subscribe(kurse => this.allkurse = kurse); 
    this.kurseService.getAllKurskategorien().subscribe(kurskategorie => this.allKurskategorien = kurskategorie); 
    this.komptenzenService.getAllKompetenzen().subscribe((kompetenzen) =>  {
      this.allKompetenzen = kompetenzen
      this.addCheckboxes();
    }); 
  }
  
  onSubmit() { 
    const selectedKurskategorie = this.kursAddForm.value.kurskategorie;
    this.kursAddForm.value.kurskategorie = this.allKurskategorien.find(kategorie => kategorie.kurskategoriename == selectedKurskategorie);

    const selectedKompetenzen = this.kursAddForm.value.kurskompetenzen_erlerndend;
    this.kursAddForm.value.kurskompetenzen_erlerndend = [];
    selectedKompetenzen.forEach((element: boolean, index:number) => {
      if(element == true) {
        this.kursAddForm.value.kurskompetenzen_erlerndend.push(this.allKompetenzen[index])
      }
    });
    
    this.kurs.kursname = this.kursAddForm.value.kursname;
    this.kurs.kursbeschreibung = this.kursAddForm.value.kursbeschreibung;
    this.kurs.kurskategorie = this.kursAddForm.value.kurskategorie;
    this.kurs.kurskompetenzen_erlerndend = this.kursAddForm.value.kurskompetenzen_erlerndend;
    this.kurs.link = this.kursAddForm.value.link;  

    this.kurseService.addKurs(this.kurs).subscribe((data: any) => {
      this.kurs.id = data.insertId;
      
      this.kurseService.addKurs_Kat(this.kurs).subscribe((data1: any) =>{
        this.kurs.kurskompetenzen_erlerndend.forEach(element => {
          this.kurseService.addKurs_Komp(element.id, this.kurs).subscribe((data: any) =>{
            console.log(this.kurs);
          });
        });
      });
      this.kursHinzugefuegt = true;
      console.log(data.insertId);
    console.log(this.kurs);
  });
}

  goBack() {
    this.location.back();
  }

}
