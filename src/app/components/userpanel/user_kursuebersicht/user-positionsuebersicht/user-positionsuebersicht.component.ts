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

  /**
  * Holt alle Positionen aus der Datenbank via Positionsservice
  * Und filtert relevante Positionen
  */
  getAllPositionen() {
    this.positionenService.getAllPositionen().subscribe((allePositionen) => {
      this.allePositionen = allePositionen
      for (let position of this.allePositionen) {
        if (position.passend_zu_branche == 1) {
          this.positionen.push(position);
        }
      }
    });

  }

  /**
  * (Nächste vier Methoden) Holen alle Positionenkategorien der Spalte 1/2/3/4, welche zur Branche passen 
  * und beiwelchen auch Positionen der Kategorie zugeteilt wurden via Positionsservice
  */
  getPositionskategorien_spalte1() {
    this.positionenService.getAllValidePositionskategorienFromSpalte(1).subscribe((positionskategorien_S1) => {
      this.positionskategorien_S1 = positionskategorien_S1
    });
  }

  getPositionskategorien_spalte2() {
    this.positionenService.getAllValidePositionskategorienFromSpalte(2).subscribe((positionskategorien_S2) => {
      this.positionskategorien_S2 = positionskategorien_S2
    });
  }

  getPositionskategorien_spalte3() {
    this.positionenService.getAllValidePositionskategorienFromSpalte(3).subscribe((positionskategorien_S3) => {
      this.positionskategorien_S3 = positionskategorien_S3
    });
  }

  getPositionskategorien_spalte4() {
    this.positionenService.getAllValidePositionskategorienFromSpalte(4).subscribe((positionskategorien_S4) => {
      this.positionskategorien_S4 = positionskategorien_S4
    });
  }

  /**
  * Entfernt alle Leerschläge eines Strings
  * Wird benötigt, um ID-Attribute-Namen ohne Leerschläge zu garantieren
  * @param string Der String, welcher von allen Leerschlägen befreit werden solll
  * @returns Den selben String ohne Leerschläge
  */
  trimString(string: string) {
    return string.replace(/\s/g, "")
  }

}
