import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, } from '@angular/forms';
import { Location } from '@angular/common';

import { Position } from 'src/app/interfaces/position';
import { Kurs } from 'src/app/interfaces/kurs';
import { Kompetenz } from 'src/app/interfaces/kompetenz';

import { KurseService } from 'src/app/services/kurse.service';
import { KompetenzenService } from 'src/app/services/kompetenzen.service';
import { PositionenService } from 'src/app/services/positionen.service';

@Component({
  selector: 'app-user-anforderung-position-form',
  templateUrl: './user-anforderung-position-form.component.html',
  styleUrls: ['./user-anforderung-position-form.component.css']
})
export class UserAnforderungPositionFormComponent implements OnInit {

  kompetenzenFilterForm!: FormGroup;
  showresults = false;
  allPositionen: Position[] = [{   
    "id": -1,
    "positionsname": "",
    "positionskategorie": {"id": -1, "positionskategoriename": "", "spalte": 0},
    "positionsbeschreibung": "",
    "positionskompetenzen": [],
    "passend_zu_branche": 0
 }];
  allKurse: Kurs[] = [];
  kurseFilters: Kurs[] = [];
  ausgewaehlteKompetenzen: Kompetenz[] = [];
  ausgewaehltePosition: Position = {   
    "id": -1,
    "positionsname": "",
    "positionskategorie": {"id": -1, "positionskategoriename": "", "spalte": 0},
    "positionsbeschreibung": "",
    "positionskompetenzen": [],
    "passend_zu_branche": 0
 };
  allKompetenzen: Kompetenz[] = [];

  constructor(
    private positionenService: PositionenService,
    private komptenzenService: KompetenzenService,
    private kurseService: KurseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.kompetenzenFilterForm = new FormGroup({
      position: new FormControl(this.ausgewaehltePosition),
      kompetenzen: new FormArray([])
    });


    this.getData();
  }

  get position() {
    return this.kompetenzenFilterForm.get('position')!;
  }

  get kompetenzen() {
    return this.kompetenzenFilterForm.get('kompetenzen') as FormArray;
  }

  private addCheckboxes() {
    this.kompetenzen.clear();
    this.allKompetenzen.forEach((kompetenzAllKompetenzen) => {
    if(this.ausgewaehltePosition.id === -1){
      this.kompetenzen.push(new FormControl(false))
    } else if (this.ausgewaehltePosition.positionskompetenzen.some(kompetenz => kompetenz.id === kompetenzAllKompetenzen.id)) {
      this.kompetenzen.push(new FormControl(true))
    } else {
      this.kompetenzen.push(new FormControl(false));
    }
    });
   
  }
  
  getData() {
    this.positionenService.getAllPositionen().subscribe(positionen => this.allPositionen = positionen); 
    this.kurseService.getAllKurse().subscribe(kurse => {this.allKurse = kurse}); 
    
    this.komptenzenService.getAllKompetenzen().subscribe(kompetenzen => {
      this.allKompetenzen = kompetenzen;
      this.addCheckboxes();
    }); 
    
  }

  filterKurse(){
    console.log(this.allKurse)
    this.ausgewaehlteKompetenzen = []
    const selectedKompetenzen = this.kompetenzenFilterForm.value.kompetenzen;
    selectedKompetenzen.forEach((element: boolean, index:number) => {
      if(element == true) {
        this.ausgewaehlteKompetenzen.push(this.allKompetenzen[index])
      }
    });
    this.kurseFilters = [];

    this.allKurse.forEach(kurs => {
      kurs.kurskompetenzen_erlerndend.forEach(kompetenz => {
        this.ausgewaehlteKompetenzen.forEach(auswahlKompetenz => {
          if(auswahlKompetenz.id === kompetenz.id){
            if(!this.kurseFilters.includes(kurs)){
              this.kurseFilters.push(kurs);
            }
          }
        });
        
      });
    });

    
    console.log(this.kurseFilters);
    
  }

  changePosition(){
    this.ausgewaehltePosition = this.kompetenzenFilterForm.value.position;
    this.addCheckboxes();
    this.onSubmit();
    console.log(this.kompetenzenFilterForm.value.position)
  }

  checkAusgewaehlt(kurskompetenz: Kompetenz) {
    return this.ausgewaehlteKompetenzen.some(kompetenz => kompetenz.id === kurskompetenz.id)
  }

  resetForm(){
    this.kompetenzenFilterForm.reset();
    this.showresults = false;
  }

  onSubmit(){
    console.log(this.allKurse)
    this.showresults = true;
    this.filterKurse();
    console.log(this.kompetenzenFilterForm.value);
    console.log();
    }
}
