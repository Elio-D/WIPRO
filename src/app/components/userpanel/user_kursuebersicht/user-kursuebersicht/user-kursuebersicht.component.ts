import { Component, OnInit } from '@angular/core';
import { KurseService } from 'src/app/services/kurse.service';
import { Kurs } from 'src/app/interfaces/kurs';
import { Kurskategorie } from 'src/app/interfaces/kurskategorie';

@Component({
  selector: 'app-user-kursuebersicht',
  templateUrl: './user-kursuebersicht.component.html',
  styleUrls: ['./user-kursuebersicht.component.css']
})
export class UserKursuebersichtComponent implements OnInit {

  kurse: Kurs[] = [];
  kurskategorien_S1: Kurskategorie[] = [];
  kurskategorien_S2: Kurskategorie[] = [];
  kurskategorien_S3: Kurskategorie[] = [];
  kurskategorien_S4: Kurskategorie[] = [];

  showKursuebersicht = true;

  constructor(private kurseService: KurseService) { }

  ngOnInit(): void {
    this.getAllKurse();
    this.getKurskategorien_spalte1();
    this.getKurskategorien_spalte2();
    this.getKurskategorien_spalte3();
    this.getKurskategorien_spalte4();
  }
  
  getAllKurse() {
    this.kurseService.getAllKurse().subscribe(kurse => this.kurse = kurse);
  }

  getKurskategorien_spalte1() {
    this.kurseService.getAllKategorienFromSpalte(1).subscribe(kurskategorie_S1 => this.kurskategorien_S1 = kurskategorie_S1);
  }

  getKurskategorien_spalte2() {
    this.kurseService.getAllKategorienFromSpalte(2).subscribe(kurskategorie_S2 => this.kurskategorien_S2 = kurskategorie_S2);
  }

  getKurskategorien_spalte3() {
    this.kurseService.getAllKategorienFromSpalte(3).subscribe(kurskategorie_S3 => this.kurskategorien_S3 = kurskategorie_S3);
  }

  getKurskategorien_spalte4() {
    this.kurseService.getAllKategorienFromSpalte(4).subscribe(kurskategorie_S4 => this.kurskategorien_S4 = kurskategorie_S4);
  }

}
