import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Position } from '../interfaces/position';
import { Positionskategorie } from '../interfaces/positionskategorie';

@Injectable({
  providedIn: 'root'
})
export class PositionenService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:4566";  
  //private baseUrl = "http://wipro-hs22-mstrebel.enterpriselab.ch:8080";  

  //-------------Position----------

    /**
  * Liest alle Positionen von der Datenbank
  * @returns Observable Position-Array
  */
  getAllPositionen(): Observable<Position[]> {
    const url = `${this.baseUrl}/positionen`;
    return this.http.get<Position[]>(url);
  }

  /**
  * Liest eine Position von der Datenbank anhand ihrer ID
  * @param id der Position
  * @returns Observable Position
  */
  getPositionByID(id: number): Observable<Position> {
    const url = `${this.baseUrl}/positionByID/${id}`;
    return this.http.get<Position>(url);
  }

  /**
  * Updated eine Position mit neuen Daten
  * @param position die Position mit den Basis Daten
  */
  updatePosition(position: Position){
    const url = `${this.baseUrl}/position_update`;
    return this.http.put(url, position, this.httpOptions);
  }

  /**
  * Updated die Positionskategorie anhand der ID, gehört zu updatePosition
  * @param id der Position
  * @param position die Position mit allen Basis Daten
  */
  updatePositionKat(id: number, position: Position){
    const url = `${this.baseUrl}/position_update_kat/${id}`;
    return this.http.put(url, position, this.httpOptions);
  }

  /**
  * Löscht alle Positionskompetenzen, wird zusammen mit addPosition als Update verwendet
  * @param id der Position
  */
  deletePositionKomp(id: number){
    const url = `${this.baseUrl}/position_komp_delete/${id}`;
    return this.http.delete<Position>(url, this.httpOptions);
  }

  /**
  * Fügt eine neue Position hinzu, ohne Kategorie und Kompetenzen
  * @param position die Position mit Basis-Daten
  */
  addPosition(position: Position){
    const url = `${this.baseUrl}/position_add`;
    return this.http.post<Position>(url, position);
  }

  /**
  * Fügt die Kategorie einer Position hinzu
  * @param position die Position mit Basis-Daten und Kategorie Objekt
  */
  addPosition_Kat(position: Position) {
    //KURSE.push(kurs);
    const url = `${this.baseUrl}/position_add_kat/${position.id}`;
    return this.http.post<Position>(url, position);
  }

  /**
  * Fügt die neuen Kompetenzen einer Position hinzu
  * @param id die Kompetenz ID
  * @param position die Position mit Basis-Daten und Kompetenz-Array
  * @returns Observable Position-Array
  */
  addPosition_Komp(id: number, position: Position) {
    const url = `${this.baseUrl}/position_add_komp/${id}`;
    return this.http.post<Position>(url, position);
  }

  /**
  * Löscht die Position Basis-Daten, ohne Kompetenz und Kategorie
  * @param id die Positions ID
  * @returns Observable Position
  */
  deletePosition(id: number): Observable<Position> {
    const url = `${this.baseUrl}/position_delete/${id}`;
    return this.http.delete<Position>(url, this.httpOptions);
  }

  //---------Positionskategorie------------

  /**
  * Liest alle Positionskategorien von der Datenbank
  * @returns Observable Positionskategorie-Array
  */
  getAllPositionskateogrien(): Observable<Positionskategorie[]> {
    const url = `${this.baseUrl}/positionskategorien`;
    return this.http.get<Positionskategorie[]>(url);
  }

  /**
  * Liest eine Positionskategorie anhand ihrer ID von der Datenbank
  * @param id Positionskategorie ID
  * @returns Observable Positionskategorie
  */
  getPositionskateogrieByID(id: number): Observable<Positionskategorie> {
    const url = `${this.baseUrl}/positionskategorieByID/${id}`;
    return this.http.get<Positionskategorie>(url);
  }

  /**
  * Liest eine Positionskategorie anhand ihrer Spalte von der Datenbank
  * @param spalte Positionskategorie Spalte
  * @returns Observable Positionskategorie-Array
  */
  getAllPositionskategorienFromSpalte(spalte: number): Observable<Positionskategorie[]> {
    if (!spalte) { //ist Spalte gültig?
      return of([]);
    }
    const url = `${this.baseUrl}/positionskategorien/${spalte}`;
    return this.http.get<Positionskategorie[]>(url);
  }

  /**
  * Liest eine Positionskategorie anhand ihrer Spalte von der Datenbank die auch in der Branche angesiedelt ist
  * @param spalte Positionskategorie Spalte
  * @returns Observable Positionskategorie-Array
  */
  getAllValidePositionskategorienFromSpalte(spalte: number): Observable<Positionskategorie[]> {
    if (!spalte) { //ist Spalte gültig?
      return of([]);
    }
    const url = `${this.baseUrl}/positionskategorien_valid_branche/${spalte}`;
    return this.http.get<Positionskategorie[]>(url);
  }

  /**
  * Fügt eine neue Positionskategorie der Datenbank 
  * @param positonskategorie Positionskategorie Objekt mit allen Daten
  */
  addPositionskategorie(positonskategorie: Positionskategorie){
    const url = `${this.baseUrl}/positionskategorie_add`;
    return this.http.post<Positionskategorie>(url, positonskategorie);
  }

  /**
  * Updated eine Positionskategorie
  * @param positonskategorie Positionskategorie Objekt mit allen Daten
  * @returns Observable any
  */
  updateKurskategorie(positonskategorie: Positionskategorie): Observable<any> {
    const url = `${this.baseUrl}/positionskategorie_update/${positonskategorie.id}`;
    return this.http.put(url, positonskategorie, this.httpOptions);
  }

  /**
  * Löscht eine Positionskategorie anhand ihrer ID
  * @param id Positionskategorie ID
  * @returns Observable Positionskategorie Objekt
  */
  deletePositionskategorie(id: number): Observable<Positionskategorie> {
    const url = `${this.baseUrl}/positionskategorie_delete/${id}`;
    return this.http.delete<Positionskategorie>(url, this.httpOptions);
  }

}
