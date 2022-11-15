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
  selector: 'app-user-qualifikationen-form',
  templateUrl: './user-qualifikationen-form.component.html',
  styleUrls: ['./user-qualifikationen-form.component.css']
})
export class UserQualifikationenFormComponent implements OnInit {

  kompetenzenFilterForm!: FormGroup;
  showresults = false;

  allPositionen: Position[] = []
  allKurse: Kurs[] = [];
  positionenFilters: Position[] = [];
  ausgewaehlteKompetenzen: Kompetenz[] = [];
  allKompetenzen: Kompetenz[] = [];

  constructor( 
    private positionenService: PositionenService,
    private komptenzenService: KompetenzenService,
    private kurseService: KurseService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.kompetenzenFilterForm = new FormGroup({
      kompetenzen: new FormArray([])
  });
  this.getData();
}

get kompetenzen() {
  return this.kompetenzenFilterForm.get('kompetenzen') as FormArray;
}

private addCheckboxes() {
    this.allKompetenzen.forEach(() => this.kompetenzen.push(new FormControl(false)));
    }
 
    getData() {
      this.positionenService.getAllPositionen().subscribe(positionen => this.allPositionen = positionen); 
      this.kurseService.getAllKurse().subscribe(kurse => this.allKurse = kurse); 
      this.komptenzenService.getAllKompetenzen().subscribe(kompetenzen => {this.allKompetenzen = kompetenzen
        this.addCheckboxes()}); 
    }

    filterPositionen(){
      this.ausgewaehlteKompetenzen = []
      const selectedKompetenzen = this.kompetenzenFilterForm.value.kompetenzen;
      selectedKompetenzen.forEach((element: boolean, index:number) => {
        if(element == true) {
          this.ausgewaehlteKompetenzen.push(this.allKompetenzen[index])
        }
      });
      this.positionenFilters = [];
      this.allPositionen.forEach(position => {
        position.positionskompetenzen.forEach(kompetenz => {
          this.ausgewaehlteKompetenzen.forEach(auswahlKompetenz => {
            if(auswahlKompetenz.id === kompetenz.id){
              if(!this.positionenFilters.includes(position)){
                this.positionenFilters.push(position);
              }
            }
          });
          
        });
      });

    }

      checkAusgewaehlt(kurskompetenz: Kompetenz) {
        return this.ausgewaehlteKompetenzen.some(kompetenz => kompetenz.id === kurskompetenz.id)
      }
    
      resetForm(){
        this.kompetenzenFilterForm.reset();
        this.showresults = false;
      }
    
      onSubmit(){
        this.showresults = true;
        this.filterPositionen();
        console.log(this.kompetenzenFilterForm.value);
        console.log();
        }
}
