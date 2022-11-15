import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PositionenService } from 'src/app/services/positionen.service';
import { Position } from 'src/app/interfaces/position';
import { Positionskategorie } from 'src/app/interfaces/positionskategorie';

@Component({
  selector: 'app-user-positionsuebersicht',
  templateUrl: './user-positionsuebersicht.component.html',
  styleUrls: ['./user-positionsuebersicht.component.css']
})
export class UserPositionsuebersichtComponent implements OnInit {

  @Output() formSubmittedEvent = new EventEmitter<boolean>();

  allePositionen: Position[] = [];
  positionen: Position[] = [];
  allePositionskategorien: Positionskategorie[] = [];
  positionskategorien_S1: Positionskategorie[] = [];
  positionskategorien_S2: Positionskategorie[] = [];
  positionskategorien_S3: Positionskategorie[] = [];
  positionskategorien_S4: Positionskategorie[] = [];


  constructor(private positionenService: PositionenService) { }

  ngOnInit(): void {
    this.getAllPositionen();
    this.getPositionskategorien_spalte1();
    this.getPositionskategorien_spalte2();
    this.getPositionskategorien_spalte3();
    this.getPositionskategorien_spalte4();
  }

  getAllPositionen() {
    this.positionenService.getAllPositionen().subscribe((allePositionen) => {
      this.allePositionen = allePositionen
      this.getRelevantePositionen();
    });
  
  }

  getRelevantePositionen() {
    for (let position of this.allePositionen){
      if(position.passend_zu_branche == 1) {
        this.positionen.push(position);
      }
    }
    console.log(this.positionen);
  }

  getPositionskategorien_spalte1() {
    this.positionenService.getAllPositionskategorienFromSpalte(1).subscribe((positionskategorien_S1) => {
      this.positionskategorien_S1 = positionskategorien_S1   
    });
  }

  getPositionskategorien_spalte2() {
    this.positionenService.getAllPositionskategorienFromSpalte(2).subscribe((positionskategorien_S2) => {
      this.positionskategorien_S2 = positionskategorien_S2
  });
}

  getPositionskategorien_spalte3() {
    this.positionenService.getAllPositionskategorienFromSpalte(3).subscribe((positionskategorien_S3) => {
      this.positionskategorien_S3 = positionskategorien_S3
    });
  }

  getPositionskategorien_spalte4() {
    this.positionenService.getAllPositionskategorienFromSpalte(4).subscribe((positionskategorien_S4) => {
      this.positionskategorien_S4 = positionskategorien_S4
    });
  }

 /* getPositionskategorien_spalte(positionskategorien: Positionskategorie[], spalte: number) {
    for (let positionskategorie of positionskategorien){
      for (let position of this.positionen){
        if(position.positionskategorie.positionskategoriename === positionskategorie.positionskategoriename && positionskategorie.spalte == spalte) {
          if(spalte == 1) {
            this.positionskategorien_S1.push(positionskategorie)
          }
          if(spalte == 2) {
            this.positionskategorien_S2.push(positionskategorie)
          }
          if(spalte == 3) {
            this.positionskategorien_S3.push(positionskategorie)
          }
          if(spalte == 4) {
            this.positionskategorien_S4.push(positionskategorie)
          }
        }
      }
    }
  }*/

}
