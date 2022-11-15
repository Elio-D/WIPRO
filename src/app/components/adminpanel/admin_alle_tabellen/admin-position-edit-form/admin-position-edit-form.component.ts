import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Position } from 'src/app/interfaces/position';
import { Positionskategorie } from 'src/app/interfaces/positionskategorie';
import { Kompetenz } from 'src/app/interfaces/kompetenz';

import { KompetenzenService } from 'src/app/services/kompetenzen.service';
import { PositionenService } from 'src/app/services/positionen.service';

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
  selector: 'app-admin-position-edit-form',
  templateUrl: './admin-position-edit-form.component.html',
  styleUrls: ['./admin-position-edit-form.component.css']
})
export class AdminPositionEditFormComponent implements OnInit {

  positionEditForm!: FormGroup;
  position: Position;

  allPositionen: Position[] = [];
  allPositionskategorien: Positionskategorie[] = [{ "id": -1, "spalte": 0, "positionskategoriename": "" }];
  allKompetenzen: Kompetenz[] = []

  positionBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;

  constructor(
    private positionenService: PositionenService,
    private kompetenzenService: KompetenzenService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.position = {
      positionskategorie: {"id": -1, "spalte": 0, "positionskategoriename": ""},
      passend_zu_branche: 1
    } as Position;
   }

  ngOnInit(): void {
    this.positionEditForm = new FormGroup({
      positionsname: new FormControl(this.position.positionsname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        
      ]),
      positionskategorie: new FormControl(this.position.positionskategorie.positionskategoriename, [
        Validators.required
      ]),
      positionsbeschreibung: new FormControl(this.position.positionsbeschreibung, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000),
      ]),
      positionskompetenzen: new FormArray([], minSelectedCheckboxes()),
      passend_zu_branche: new FormControl(this.position.passend_zu_branche, [
        Validators.required
      ]),
    });
    this.getData();
  }

  get positionsname() {
    return this.positionEditForm.get('positionsname')!;
  }

  get positionskategorie() {
    return this.positionEditForm.get('positionskategorie')!;
  }
  get positionsbeschreibung() {
    return this.positionEditForm.get('positionsbeschreibung')!;
  }

  get positionskompetenzen() {
    return this.positionEditForm.get('positionskompetenzen') as FormArray;
  }

  get passend_zu_branche() {
    return this.positionEditForm.get('passend_zu_branche')!;
  }

  private addCheckboxes() {
    this.positionskompetenzen.clear();
    this.allKompetenzen.forEach((kompetenzAllKompetenzen) => {
    if (this.position.positionskompetenzen.some(kompetenz => kompetenz.id === kompetenzAllKompetenzen.id)) {
      this.positionskompetenzen.push(new FormControl(true))
    } else {
      this.positionskompetenzen.push(new FormControl(false));
    }
    });  
  }

  getData() {
    this.positionenService.getAllPositionen().subscribe(positionen => this.allPositionen = positionen); 
    this.positionenService.getAllPositionskateogrien().subscribe(positionskategorie => this.allPositionskategorien = positionskategorie); 
    this.kompetenzenService.getAllKompetenzen().subscribe((kompetenzen) =>  {
      this.allKompetenzen = kompetenzen
    }); 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.positionenService.getPositionByID(id).subscribe((position) => {
      this.position = position
    this.positionEditForm = new FormGroup({
      positionsname: new FormControl(this.position.positionsname, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        
      ]),
      positionskategorie: new FormControl(this.position.positionskategorie.positionskategoriename, [
        Validators.required
      ]),
      positionsbeschreibung: new FormControl(this.position.positionsbeschreibung, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1000),
      ]),
      positionskompetenzen: new FormArray([], minSelectedCheckboxes()),
      passend_zu_branche: new FormControl(this.position.passend_zu_branche, [
        Validators.required
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

  showPassendZuBranche(): string {
    if(this.position.passend_zu_branche == 1){
      return "Ja"
    } else {
      return "Nein"
    }
  }

  goBack(): void {
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  reload(): void {
    window.location.reload()
  }

  deleteItem(): void {
    console.log("Kurs wurde gelöscht");
    //this.positionenService.deletePosition(this.position.id).subscribe();
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
    const kForm = JSON.stringify(this.positionEditForm.value.positionskompetenzen);
    console.log(kForm)
    const kKurs = JSON.stringify(this.position.positionskompetenzen);
    if(kForm == kKurs) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    const selectedPositionskategorie = this.positionEditForm.value.positionskategorie;
    this.positionEditForm.value.positionskategorie = this.allPositionskategorien.find(kategorie => kategorie.positionskategoriename == selectedPositionskategorie);

    const selectedKompetenzen = this.positionEditForm.value.positionskompetenzen;
    this.positionEditForm.value.positionskompetenzen = [];
    selectedKompetenzen.forEach((element: boolean, index:number) => {
      if(element == true) {
        this.positionEditForm.value.positionskompetenzen.push(this.allKompetenzen[index])
      }
    });

    const selectedPassend_zu_Branche = this.positionEditForm.value.passend_zu_branche;
    if(this.positionEditForm.value.passend_zu_branche){
      this.positionEditForm.value.passend_zu_branche = 1;
    } else {
      this.positionEditForm.value.passend_zu_branche = 0;
    }  

    if(this.position.positionsname == this.positionEditForm.value.positionsname && 
      this.position.positionsbeschreibung == this.positionEditForm.value.positionsbeschreibung && 
      this.position.positionskategorie.positionskategoriename == this.positionEditForm.value.positionskategorie.positionskategoriename &&  
      this.kompetenzenGleich() &&
      this.position.passend_zu_branche == this.positionEditForm.value.link){
        this.FormHasChanged = false;  
        console.log("haltstop")
    } else {
    this.position.positionsname = this.positionEditForm.value.positionsname;
    this.position.positionskategorie = this.positionEditForm.value.positionskategorie;
    this.position.positionsbeschreibung = this.positionEditForm.value.positionsbeschreibung;
    this.position.positionskompetenzen = this.positionEditForm.value.positionskompetenzen;
    this.position.passend_zu_branche = this.positionEditForm.value.passend_zu_branche; 

    this.positionenService.updatePosition(this.position).subscribe((data: any) => {
      this.positionenService.updatePositionKat(this.position.id, this.position).subscribe((data1: any) => {
        this.positionenService.deletePositionKomp(this.position.id).subscribe((data: any) => {
          this.position.positionskompetenzen.forEach(element => {
            this.positionenService.addPosition_Komp(element.id, this.position).subscribe((data1: any) =>{

            });
          });
        });
      });
      this.positionBearbeitet  = true;
    });
  }
}
}