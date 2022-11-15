import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PositionenService } from 'src/app/services/positionen.service';
import { Position } from 'src/app/interfaces/position';
import { Kompetenz } from 'src/app/interfaces/kompetenz';

@Component({
  selector: 'app-user-positionsdetail',
  templateUrl: './user-positionsdetail.component.html',
  styleUrls: ['./user-positionsdetail.component.css']
})
export class UserPositionsdetailComponent implements OnInit {

  position: Position | undefined;
  positionskompetenzen: Kompetenz[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private positionenService: PositionenService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.positionenService.getPositionByID(id)
      .subscribe((position) => {
        this.position = position
        this.getPositionskompetenzen();
      });
  }

  getPositionskompetenzen(): void {
    this.positionskompetenzen = this.position?.positionskompetenzen;
  }

  goBack(): void {
    this.location.back();
  }

}
