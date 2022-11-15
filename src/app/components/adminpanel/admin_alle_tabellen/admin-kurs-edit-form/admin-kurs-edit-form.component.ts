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

  kursBearbeitet  = false;

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

  getData() {
    this.kursService.getAllKurse().subscribe(kurse => this.allkurse = kurse); 
    this.kursService.getAllKurskategorien().subscribe(kurskategorie => this.allKurskategorien = kurskategorie); 
    this.komptenzenService.getAllKompetenzen().subscribe((kompetenzen) =>  {
      this.allKompetenzen = kompetenzen
      console.log("alle Kompetenezn:" + this.allKompetenzen)
    }); 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kursService.getKursByID(id).subscribe((kurs) => {
      this.kurs = kurs
      console.log(this.kurs)
      console.log("kurs:" + this.kurs.kurskompetenzen_erlerndend)
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
      this.addCheckboxes();  
      
    });
  }

  controlFormChange(){
    if(this.itemGetsEdited && this.FormHasChanged){
      return true
    } else if (this.itemGetsEdited && !this.FormHasChanged){
      return false
    } else {
      return true
    }
    
  }

  goBack(): void {
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  reload(): void {
    window.location.reload()
  }

  deleteItem(): void {
    console.log("Position wurde gelöscht");
    //this.kursService.deleteKurs(this.kurs.id).subscribe();
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  editItem(): void {
    this.itemGetsEdited = true;
    this.FormHasChanged = true;
  }

  exitEdit(): void {
    this.itemGetsEdited = false;
    this.FormHasChanged = false;
  }

  kompetenzenGleich(): boolean {
    const kForm = JSON.stringify(this.kursEditForm.value.kurskompetenzen_erlerndend);
    console.log(kForm)
    const kKurs = JSON.stringify(this.kurs.kurskompetenzen_erlerndend);
    if(kForm == kKurs) {
      return true;
    } else {
      return false;
    }
  }
  

  onSubmit() { 
    const selectedKurskategorie = this.kursEditForm.value.kurskategorie;
    this.kursEditForm.value.kurskategorie = this.allKurskategorien.find(kategorie => kategorie.kurskategoriename == selectedKurskategorie);

    const selectedKompetenzen = this.kursEditForm.value.kurskompetenzen_erlerndend;
    this.kursEditForm.value.kurskompetenzen_erlerndend = [];
    selectedKompetenzen.forEach((element: boolean, index:number) => {
      if(element == true) {
        this.kursEditForm.value.kurskompetenzen_erlerndend.push(this.allKompetenzen[index])
      }
    });
    
    if(this.kurs.kursname == this.kursEditForm.value.kursname && 
      this.kurs.kursbeschreibung == this.kursEditForm.value.kursbeschreibung && 
      this.kurs.kurskategorie.kurskategoriename == this.kursEditForm.value.kurskategorie.kurskategoriename &&  
      this.kompetenzenGleich() &&
      this.kurs.link == this.kursEditForm.value.link){
        this.FormHasChanged = false;  
        console.log("haltstop")
    } else {
    this.kurs.kursname = this.kursEditForm.value.kursname;
    this.kurs.kursbeschreibung = this.kursEditForm.value.kursbeschreibung;
    this.kurs.kurskategorie = this.kursEditForm.value.kurskategorie;
    this.kurs.kurskompetenzen_erlerndend = this.kursEditForm.value.kurskompetenzen_erlerndend;
    this.kurs.link = this.kursEditForm.value.link;  
    console.log(this.kurs);
    
    this.kursService.updateKurs(this.kurs).subscribe((data: any) => {
      this.kursService.updateKursKat(this.kurs.id, this.kurs).subscribe((data1: any) => {
        this.kursService.deleteKursKomp(this.kurs.id).subscribe((data: any) => {
          this.kurs.kurskompetenzen_erlerndend.forEach(element => {
            this.kursService.addKurs_Komp(element.id, this.kurs).subscribe((data1: any) =>{

            });
          });
        });
      });
      this.kursBearbeitet  = true;
    });
  }
  }
}
