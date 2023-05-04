import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Kompetenz } from '../interfaces/kompetenz';

@Injectable({
  providedIn: 'root'
})
export class KompetenzenService {

  private baseUrl = "http://localhost:4566";  
  //private baseUrl = "http://wipro-hs22-mstrebel.enterpriselab.ch:8080";  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  /**
  * Liest alle Kompetenzen von der Datenbank
  * @returns Observable Kompetenz-Array
  */
  getAllKompetenzen(): Observable<Kompetenz[]> {
    const url = `${this.baseUrl}/kompetenzen`;
    return this.http.get<Kompetenz[]>(url);
  }

  /**
  * Liest eine Kompetenz von der Datenbank anhand ihrer ID
  * @param id der Kompetenz
  * @returns Observable Kompetenz
  */
  getKompetenzByID(id: number): Observable<Kompetenz> {
    const url = `${this.baseUrl}/kompetenzByID/${id}`;
    return this.http.get<Kompetenz>(url);
  }

  /**
  * Fügt eine neue Kompetenz der Datenbank hinzu
  * @param kompetenz Kompetenz Objekt
  * @returns Observable Kompetenz
  */
  addKompetenz(kompetenz: Kompetenz): Observable<Kompetenz> {
    const url = `${this.baseUrl}/kompetenz_add`;
    return this.http.post<Kompetenz>(url, kompetenz);
  }

  /**
  * Update einer Kompetenz anhand ihrer ID
  * @param kompetenz Kompetenz Objekt
  * @returns Observable any
  */
  updateKompetenz(kompetenz: Kompetenz): Observable<any> {
    const url = `${this.baseUrl}/kompetenz_update/${kompetenz.id}`;
    return this.http.put(url, kompetenz, this.httpOptions);
  }

  /**
  * Löscht eine Kompetenz anhand ihrer ID
  * @param id der Kompetenz
  * @returns Observable Kompetenz
  */
  deleteKompetenz(id: number): Observable<Kompetenz> {
    const url = `${this.baseUrl}/kompetenz_delete/${id}`;
    return this.http.delete<Kompetenz>(url, this.httpOptions);
  }

}
