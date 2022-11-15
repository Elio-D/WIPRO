import { Component, OnInit } from '@angular/core';
import { Positionskategorie } from 'src/app/interfaces/positionskategorie';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionenService } from 'src/app/services/positionen.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-positionskategorie-edit-form',
  templateUrl: './admin-positionskategorie-edit-form.component.html',
  styleUrls: ['./admin-positionskategorie-edit-form.component.css']
})
export class AdminPositionskategorieEditFormComponent implements OnInit {

  positionskateogrieEditForm!: FormGroup;
  positionskategorie: Positionskategorie;

  constructor(
   private positionenService: PositionenService,
   private location: Location,
   private route: ActivatedRoute,
   private router: Router
  ) { 
    this.positionskategorie = {
    } as Positionskategorie;
  }

  ngOnInit(): void {
    this.getPositionskategorie();
    this.positionskateogrieEditForm = new FormGroup({
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

  spalten: number[] = [1,2,3,4];

  positionskategorieBearbeitet = false;

  itemGetsEdited = false;
  FormHasChanged = true;

  get spalte() {
    return this.positionskateogrieEditForm.get('spalte')!;
  }

  get positionskategoriename() {
    return this.positionskateogrieEditForm.get('positionskategoriename')!;
  }

  getPositionskategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.positionenService.getPositionskateogrieByID(id)
      .subscribe((positionskategorie) => {
        this.positionskategorie = positionskategorie
        this.positionskateogrieEditForm = new FormGroup({
          spalte: new FormControl(this.positionskategorie.spalte, [
            Validators.required 
          ]),
          positionskategoriename: new FormControl(this.positionskategorie.positionskategoriename, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ])
        }
        
        );
      });
  }

  deleteItem(): void {
    console.log("Kurskategorie wurde gelöscht");
    this.positionenService.deletePositionskategorie(this.positionskategorie.id).subscribe();
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

  onSubmit() { 
    if(this.positionskategorie.spalte == this.positionskateogrieEditForm.value.spalte && this.positionskategorie.positionskategoriename == this.positionskateogrieEditForm.value.positionskategoriename){
      this.FormHasChanged = false;
      console.log("haltstop")
    } else {
      this.FormHasChanged = true;
      this.positionskategorie.spalte = this.positionskateogrieEditForm.value.spalte;
      this.positionskategorie.positionskategoriename = this.positionskateogrieEditForm.value.positionskategoriename;
      this.positionenService.updateKurskategorie(this.positionskategorie).subscribe(data => this.positionskategorieBearbeitet = true);

    }
  }
  
  goBack(): void {
    this.router.navigate([`/admin`], { relativeTo: this.route });
  }

  reload(): void {
    window.location.reload()
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

}

