import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { KurseService } from 'src/app/services/kurse.service';
import { Kurs } from 'src/app/interfaces/kurs';
import { Kompetenz } from 'src/app/interfaces/kompetenz';

@Component({
  selector: 'app-user-kursdetail',
  templateUrl: './user-kursdetail.component.html',
  styleUrls: ['./user-kursdetail.component.css']
})
export class UserKursdetailComponent implements OnInit {

  kurs: Kurs | undefined;
  kurskompetenzen: Kompetenz[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private kursService: KurseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  /**
  * (Nächste zwei Methoden) Holen alle Kursinformationen per ID des Kurses via Kursservice
  */
  getData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kursService.getKursByID(id)
      .subscribe((kurs) => {
        this.kurs = kurs
        this.getKurskompetenzen();
      });
  }

  getKurskompetenzen(): void {
    this.kurskompetenzen = this.kurs?.kurskompetenzen_erlerndend;
  }

  /**
  * Fügt ein Kurslog via Kursservice hinzu
  * Wird ausgeführt sobald jemand auf den Link "Zum Kursanbieter" klickt
  * @param kursID Die ID des Kurses welcher gelogt werden soll
  */
  addKurslog(kursID: number) {
    this.kursService.addKurslog(kursID).subscribe((data: any) => {
    });
  }

  /**
  * Die vorherige Seite wird aufgerufen
  */
  goBack(): void {
    this.location.back();
  }

}
