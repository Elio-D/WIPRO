import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { KurseService } from 'src/app/services/kurse.service';
import { Kurskategorie } from 'src/app/interfaces/kurskategorie';

@Component({
  selector: 'app-admin-kurskategorie-edit-form',
  templateUrl: './admin-kurskategorie-edit-form.component.html',
  styleUrls: ['./admin-kurskategorie-edit-form.component.css']
})
export class AdminKurskategorieEditFormComponent implements OnInit {

  kurskateogrieEditForm!: FormGroup;
  kurskategorie: Kurskategorie;


  constructor(
    private route: ActivatedRoute,
    private kursService: KurseService,
    private router: Router
  ) { 
    this.kurskategorie = {
    } as Kurskategorie;
  }

  ngOnInit() {
    this.getKurskategorie();
        this.kurskateogrieEditForm = new FormGroup({
          spalte: new FormControl(this.kurskategorie.spalte, [
            Validators.required 
          ]),
          kurskategoriename: new FormControl(this.kurskategorie.kurskategoriename, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ])
        });
  }

  spalten: number[] = [1,2,3,4];

  kurskategorieBearbeitet  = false;
  
  itemGetsEdited = false;
  FormHasChanged = true;

  get spalte() {
    return this.kurskateogrieEditForm.get('spalte')!;
  }

  get kurskategoriename() {
    return this.kurskateogrieEditForm.get('kurskategoriename')!;
  }


  getKurskategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kursService.getKurskategorieByID(id)
      .subscribe((kurskategorie) => {
        this.kurskategorie = kurskategorie
        this.kurskateogrieEditForm = new FormGroup({
          spalte: new FormControl(this.kurskategorie.spalte, [
            Validators.required 
          ]),
          kurskategoriename: new FormControl(this.kurskategorie.kurskategoriename, [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)
          ])
        }
        
        );
      });
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

  deleteItem(): void {
    console.log("Kurskategorie wurde gelöscht");
    this.kursService.deleteKurskategorie(this.kurskategorie.id).subscribe();
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
    if(this.kurskategorie.spalte == this.kurskateogrieEditForm.value.spalte && this.kurskategorie.kurskategoriename == this.kurskateogrieEditForm.value.kurskategoriename){
      this.FormHasChanged = false;
      console.log("haltstop")
    } else {
      this.FormHasChanged = true;
      
      this.kurskategorie.spalte = this.kurskateogrieEditForm.value.spalte;
      this.kurskategorie.kurskategoriename = this.kurskateogrieEditForm.value.kurskategoriename;
      this.kursService.updateKurskategorie(this.kurskategorie).subscribe(data => this.kurskategorieBearbeitet = true);

    }    
  }
}
