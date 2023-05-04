import { Component, OnInit } from '@angular/core';

import { Position } from 'src/app/interfaces/position';

import { Positionskategorie } from 'src/app/interfaces/positionskategorie';
import { PositionenService } from 'src/app/services/positionen.service';

@Component({
  selector: 'app-admin-positionsuebersicht',
  templateUrl: './admin-positionsuebersicht.component.html',
  styleUrls: ['./admin-positionsuebersicht.component.css']
})
export class AdminPositionsuebersichtComponent implements OnInit {

  allePositionen: Position[] = [];
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
  */
  getAllPositionen() {
    this.positionenService.getAllPositionen().subscribe((allePositionen) => {
      this.allePositionen = allePositionen
    });
  }

  /**
  * (Nächste vier Methoden) Holen alle Positionenkategorien der Spalte 1/2/3/4 via Positionsservice
  */
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
