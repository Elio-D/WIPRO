import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';
import { Kurs } from '../interfaces/kurs';
import { Kurskategorie } from '../interfaces/kurskategorie';
import { Kursgruppe } from '../interfaces/kursgruppe';

import { KURSE } from './mock-kurse';
import { KURSKATEGORIEN } from './mock-kurskategorien';
import { KURSGRUPPEN } from './mock-kursgruppen';


@Injectable({
  providedIn: 'root'
})
export class KurseService {

  private baseUrl = "http://localhost:4566";  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getAllKurse(): Observable<Kurs[]> {
    const url = `${this.baseUrl}/kurse`;
    return this.http.get<Kurs[]>(url);
  }

  getKursByID(id: number): Observable<Kurs> {
    const url = `${this.baseUrl}/kursByID/${id}`;
    return this.http.get<Kurs>(url);
  }

  getAllKursgruppen(): Observable<Kursgruppe[]> {
    const kursgruppen = of(KURSGRUPPEN);
    return kursgruppen;
    //const url = `${this.baseUrl}/kurse`;
    //return this.http.get<Kurs[]>(url).pipe(map(r => r));
  }

  getKursgruppeByID(id: number): Observable<Kursgruppe> {
    const kursgruppe = KURSGRUPPEN.find(h => h.id === id)!;
    return of(kursgruppe);
  }

/*
  getAllKurskategorien(): Observable<Kurskategorie[]> {
    const url = `${this.baseUrl}/kurskategorien`;
    return this.http.get<Kurskategorie[]>(url);
  }
  
  getAllKurseFromKategorie(kategorie: string): Observable<Kurs[]> {
    if (!kategorie.trim()) {
      return of([]);
    }
    const url = `${this.baseUrl}/${kategorie}`
    return this.http.get<Kurs[]>(url);
  }
*/

  getAllKurskategorien(): Observable<Kurskategorie[]> {
    const url = `${this.baseUrl}/kurskategorien`;
    return this.http.get<Kurskategorie[]>(url);
  }

  getKurskategorieByID(id: number): Observable<Kurskategorie> {
    const url = `${this.baseUrl}/kurskategorieByID/${id}`;
    return this.http.get<Kurskategorie>(url);
    //const url = `${this.baseUrl}/kurse`;
    //return this.http.get<Kurs[]>(url);
  }

  getAllKategorienFromSpalte(spalte: number): Observable<Kurskategorie[]> {
    if (!spalte) {
      return of([]);
    }   
    const url = `${this.baseUrl}/kurskategorien/${spalte}`;
    return this.http.get<Kurskategorie[]>(url);
  }

  updateKurs(kurs: Kurs){
    const url = `${this.baseUrl}/kurs_update`;
    return this.http.put(url, kurs, this.httpOptions);
  }

  updateKursKat(id: number, kurs: Kurs){
    const url = `${this.baseUrl}/kurs_update_kat/${id}`;
    return this.http.put(url, kurs, this.httpOptions);
  }

  deleteKursKomp(id: number){
    const url = `${this.baseUrl}/kurs_komp_delete/${id}`;
    return this.http.delete<Kurs>(url, this.httpOptions);
  }

  addKurs(kurs: Kurs) /*: Observable<Kurs> */{
    //KURSE.push(kurs);
    const url = `${this.baseUrl}/kurs_add`;
    return this.http.post<Kurs>(url, kurs);
  }

  addKurs_Kat(kurs: Kurs) /*: Observable<Kurs> */{
    //KURSE.push(kurs);
    const url = `${this.baseUrl}/kurs_add_kat/${kurs.id}`;
    return this.http.post<Kurs>(url, kurs);
  }

  addKurs_Komp(id: number, kurs: Kurs) /*: Observable<Kurs> */{
    //KURSE.push(kurs);
    const url = `${this.baseUrl}/kurs_add_komp/${id}`;
    return this.http.post<Kurs>(url, kurs);
  }

  addKurskategorie(kurskategorie: Kurskategorie): Observable<Kurskategorie> {
    const url = `${this.baseUrl}/kurskategorie_add`;
    return this.http.post<Kurskategorie>(url, kurskategorie);
  }

  updateKurskategorie(kurskategorie: Kurskategorie): Observable<any> {
    const url = `${this.baseUrl}/kurskategorie_update/${kurskategorie.id}`;
    return this.http.put(url, kurskategorie, this.httpOptions);
  }

  deleteKurskategorie(id: number): Observable<Kurskategorie> {
    const url = `${this.baseUrl}/kurskategorie_delete/${id}`;
    return this.http.delete<Kurskategorie>(url, this.httpOptions);
  }

  deleteKurs(id: number): Observable<Kurs> {
    const url = `${this.baseUrl}/kurs_delete/${id}`;
    return this.http.delete<Kurs>(url, this.httpOptions);
  }

 

}
