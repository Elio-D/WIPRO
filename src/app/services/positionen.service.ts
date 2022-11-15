import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Position } from '../interfaces/position';
import { Positionskategorie } from '../interfaces/positionskategorie';

import { POSITIONEN } from './mock-positionen';
import { POSITIONSKATEGORIEN } from './mock-positionskategorien';

@Injectable({
  providedIn: 'root'
})
export class PositionenService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:4566";  

  //-------------Position----------

  getAllPositionen(): Observable<Position[]> {
    const url = `${this.baseUrl}/positionen`;
    return this.http.get<Position[]>(url);
  }

  getPositionByID(id: number): Observable<Position> {
    const url = `${this.baseUrl}/positionByID/${id}`;
    return this.http.get<Position>(url);
  }

  updatePosition(position: Position){
    const url = `${this.baseUrl}/position_update`;
    return this.http.put(url, position, this.httpOptions);
  }

  updatePositionKat(id: number, position: Position){
    const url = `${this.baseUrl}/position_update_kat/${id}`;
    return this.http.put(url, position, this.httpOptions);
  }

  deletePositionKomp(id: number){
    const url = `${this.baseUrl}/position_komp_delete/${id}`;
    return this.http.delete<Position>(url, this.httpOptions);
  }

  addPosition(position: Position){
    const url = `${this.baseUrl}/position_add`;
    return this.http.post<Position>(url, position);
  }

  addPosition_Kat(position: Position) /*: Observable<Kurs> */{
    //KURSE.push(kurs);
    const url = `${this.baseUrl}/position_add_kat/${position.id}`;
    return this.http.post<Position>(url, position);
  }

  addPosition_Komp(id: number, position: Position) /*: Observable<Kurs> */{
    //KURSE.push(kurs);
    const url = `${this.baseUrl}/position_add_komp/${id}`;
    return this.http.post<Position>(url, position);
  }

  deletePosition(id: number): Observable<Position> {
    const url = `${this.baseUrl}/position_delete/${id}`;
    return this.http.delete<Position>(url, this.httpOptions);
  }

  //---------Positionskategorie------------

  getAllPositionskateogrien(): Observable<Positionskategorie[]> {
    const url = `${this.baseUrl}/positionskategorien`;
    return this.http.get<Positionskategorie[]>(url);
  }

  //needed?
  getPositionskateogrieByID(id: number): Observable<Positionskategorie> {
    const url = `${this.baseUrl}/positionskategorieByID/${id}`;
    return this.http.get<Positionskategorie>(url);
  }

  getAllPositionskategorienFromSpalte(spalte: number): Observable<Positionskategorie[]> {
    if (!spalte) {
      return of([]);
    }
    const url = `${this.baseUrl}/positionskategorien/${spalte}`;
    return this.http.get<Positionskategorie[]>(url);
  }

  addPositionskategorie(positonskategorie: Positionskategorie){
    const url = `${this.baseUrl}/positionskategorie_add`;
    return this.http.post<Positionskategorie>(url, positonskategorie);
  }

  updateKurskategorie(positonskategorie: Positionskategorie): Observable<any> {
    const url = `${this.baseUrl}/positionskategorie_update/${positonskategorie.id}`;
    return this.http.put(url, positonskategorie, this.httpOptions);
  }

  deletePositionskategorie(id: number): Observable<Positionskategorie> {
    const url = `${this.baseUrl}/positionskategorie_delete/${id}`;
    return this.http.delete<Positionskategorie>(url, this.httpOptions);
  }

}
