import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Kurs } from '../interfaces/kurs';
import { Kurskategorie } from '../interfaces/kurskategorie';
import { Kursgruppe } from '../interfaces/kursgruppe';
import { Kurslog } from '../interfaces/kurslog';


@Injectable({
  providedIn: 'root'
})
export class KurseService {

  private baseUrl = "http://localhost:4566";  
  //private baseUrl = "http://wipro-hs22-mstrebel.enterpriselab.ch:8080";  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  /**
  * Liest alle Kurse aus der Datenbank
  * @returns Observable Kurs-Array
  */
  getAllKurse(): Observable<Kurs[]> {
    const url = `${this.baseUrl}/kurse`;
    return this.http.get<Kurs[]>(url);
  }

  /**
  * Liest einen Kurs aus der Datenbank anhand seiner ID
  * @param id Kurs ID
  * @returns Observable Kurs
  */
  getKursByID(id: number): Observable<Kurs> {
    const url = `${this.baseUrl}/kursByID/${id}`;
    return this.http.get<Kurs>(url);
  }

  /**
  * Liest einen Kurs aus der Datenbank anhand seiner Kursgruppen Zuordnung
  * @param group Kursgruppe ID
  * @returns Observable Kurs-Array
  */
  getKursByGruppe(group: number): Observable<Kurs[]> {
    const url = `${this.baseUrl}/kursByGruppe/${group}`;
    return this.http.get<Kurs[]>(url);
  }

  /**
  * Liest eine Kursgruppe aus der Datenbank anhand der Kursgruppen ID
  * @param id Kursgruppe ID
  * @returns Observable Kursgruppe
  */
  getKursgruppeByID(id: number): Observable<Kursgruppe> {
    const url = `${this.baseUrl}/kursgruppeByID/${id}`;
    return this.http.get<Kursgruppe>(url);
  }

  /**
  * Liest alle Kurskategorien aus der Datenbank
  * @returns Observable Kurskategorie-Array
  */
  getAllKurskategorien(): Observable<Kurskategorie[]> {
    const url = `${this.baseUrl}/kurskategorien`;
    return this.http.get<Kurskategorie[]>(url);
  }

  /**
  * Liest alle Kursgruppen aus der Datenbank
  * @returns Observable Kursgruppe-Array
  */
  getAllKursgruppen(): Observable<Kursgruppe[]> {
    const url = `${this.baseUrl}/kursgruppen`;
    return this.http.get<Kursgruppe[]>(url);
  }

  /**
  * Liest eine Kurskategorie anhand ihrer ID
  * @param id Kurskategorie ID
  * @returns Observable Kurskategorie
  */
  getKurskategorieByID(id: number): Observable<Kurskategorie> {
    const url = `${this.baseUrl}/kurskategorieByID/${id}`;
    return this.http.get<Kurskategorie>(url);
  }

  /**
  * Liest alle Kurskategorien anhand der Spalte
  * @param id Kurskategorie spalte
  * @returns Observable Kurskategorie-Array
  */
  getAllKategorienFromSpalte(spalte: number): Observable<Kurskategorie[]> {
    if (!spalte) {
      return of([]);
    }   
    const url = `${this.baseUrl}/kurskategorien/${spalte}`;
    return this.http.get<Kurskategorie[]>(url);
  }

  /**
  * Liest alle Kurskategorien anhand der Spalte
  * die Kategorie muss einen Kurs beinhalten
  * @param id Kurskategorie spalte
  * @returns Observable Kurskategorie
  */
  getValidKategorienFromSpalte(spalte: number): Observable<Kurskategorie[]> {
    if (!spalte) {
      return of([]);
    }   
    const url = `${this.baseUrl}/kurskategorien_valid/${spalte}`;
    return this.http.get<Kurskategorie[]>(url);
  }  

  /**
  * Updated einen Kurs anhand der ID
  * @param id Kurs Basis-Daten, ohne Kategorie und Kompetenzen
  */
  updateKurs(kurs: Kurs){
    const url = `${this.baseUrl}/kurs_update`;
    return this.http.put(url, kurs, this.httpOptions);
  }

  /**
  * Updated die Kategorie eines Kurs anhand der Kurs und Kategorie ID
  * @param id Kurskategorie ID
  * @param kurs Kurs Objekt
  */
  updateKursKat(id: number, kurs: Kurs){
    const url = `${this.baseUrl}/kurs_update_kat/${id}`;
    return this.http.put(url, kurs, this.httpOptions);
  }

  /**
  * Löscht alle Kompetenzen eines Kurs anhand der Kurs ID
  * wird benötigt um das Update der Kompetenzen zu machen
  * @param id Kurs ID
  */
  deleteKursKomp(id: number){
    const url = `${this.baseUrl}/kurs_komp_delete/${id}`;
    return this.http.delete<Kurs>(url, this.httpOptions);
  }

  /**
  * Fügt einen Kurs der Datenbank hinzu
  * @param kurs Kurs Basis-Daten
  */
  addKurs(kurs: Kurs) {
    const url = `${this.baseUrl}/kurs_add`;
    return this.http.post<Kurs>(url, kurs);
  }

  /**
  * Fügt die Kurskategorie einem Kurs hinzu
  * @param kurs Kurs Objekt mit Kategorie Objekt
  */
  addKurs_Kat(kurs: Kurs) {
    const url = `${this.baseUrl}/kurs_add_kat/${kurs.id}`;
    return this.http.post<Kurs>(url, kurs);
  }

  /**
  * Fügt die Kompetenz einem Kurs hinzu
  * @param id Kompetenz ID
  * @param kurs Kurs Objekt
  */
  addKurs_Komp(id: number, kurs: Kurs) {
    const url = `${this.baseUrl}/kurs_add_komp/${id}`;
    return this.http.post<Kurs>(url, kurs);
  }

  /**
  * Löscht einen Kurs anhand der ID
  * Löscht die Kompetenz und Kategorie ebenfalls (Foreign Key auf diesen Tabellen)
  * @param id Kurs ID
  * @returns Observable Kurs
  */
  deleteKurs(id: number): Observable<Kurs> {
    const url = `${this.baseUrl}/kurs_delete/${id}`;
    return this.http.delete<Kurs>(url, this.httpOptions);
  }

  /**
  * Fügt eine Kurskategorie hinzu
  * @param kurskategorie Kurskategorie Objekt
  * @returns Observable Kurskategorie
  */
  addKurskategorie(kurskategorie: Kurskategorie): Observable<Kurskategorie> {
    const url = `${this.baseUrl}/kurskategorie_add`;
    return this.http.post<Kurskategorie>(url, kurskategorie);
  }

  /**
  * Updated eine Kurskategorie anhand der ID
  * @param kurskategorie Kurskategorie Objekt
  * @returns Observable any
  */
  updateKurskategorie(kurskategorie: Kurskategorie): Observable<any> {
    const url = `${this.baseUrl}/kurskategorie_update/${kurskategorie.id}`;
    return this.http.put(url, kurskategorie, this.httpOptions);
  }

  /**
  * Löscht eine Kurskategorie anhand der ID
  * @param id Kurskategorie ID
  * @returns Observable Kurskategorie
  */
  deleteKurskategorie(id: number): Observable<Kurskategorie> {
    const url = `${this.baseUrl}/kurskategorie_delete/${id}`;
    return this.http.delete<Kurskategorie>(url, this.httpOptions);
  }

  /**
  * Fügt eine neue Kursgruppe hinzu
  * @param kursgruppe Kursgruppe Objekt
  * @returns Observable Kursgruppe
  */
  addKursgruppe(kursgruppe: Kursgruppe): Observable<Kursgruppe> {
    const url = `${this.baseUrl}/kursgruppe_add`;
    return this.http.post<Kursgruppe>(url, kursgruppe);
  }

  /**
  * Updated eine Kursgruppe
  * @param kursgruppe Kursgruppe Objekt
  * @returns Observable any
  */
  updateKursgruppe(kursgruppe: Kursgruppe): Observable<any> {
    const url = `${this.baseUrl}/kursgruppe_update/${kursgruppe.id}`;
    return this.http.put(url, kursgruppe, this.httpOptions);
  }

  /**
  * Löscht eine Kursgruppe
  * Löscht die Zuordnung der Kurse zu der Gruppe ebenfalls (Foreign Key in Datenbank)
  * @param id Kursgruppe ID
  * @returns Observable Kursgruppe
  */
  deleteKursgruppe(id: number): Observable<Kursgruppe> {
    const url = `${this.baseUrl}/kursgruppe_delete/${id}`;
    return this.http.delete<Kursgruppe>(url, this.httpOptions);
  }

  /**
  * Löscht alle Kurse einer Kursgruppe
  * @param id Kursgruppe ID
  * @returns Observable Kursgruppe
  */
  deleteKurse_Gruppe(id: number): Observable<Kursgruppe> {
    const url = `${this.baseUrl}/kursgruppe_delete_kurse/${id}`;
    return this.http.delete<Kursgruppe>(url, this.httpOptions);
  }

  /**
  * Löscht einen Kurs in der Kursgruppe
  * @param id Kursgruppe ID
  * @param kurs Kurs ID
  * @returns Observable any
  */
  deleteKurs_Gruppe(id: number, kurs: number): Observable<any> {
    const url = `${this.baseUrl}/kursdelete_kursgruppe/${id}/${kurs}`;
    return this.http.delete<Kursgruppe>(url, this.httpOptions);
  }

  /**
  * Fügt der Kursgruppe einen neuen Kurs hinzu, Count bestimmt die Position der Abfolge
  * @param id Kurs ID
  * @param count Kursabfolge Position
  * @param kursgruppe Kursgruppe Objekt
  * @returns Observable any
  */
  addKurse_Gruppe(id: number, count: number, kursgruppe: Kursgruppe): Observable<any> {
    const url = `${this.baseUrl}/kursgruppe_add_kurse/${id}/${count}`;
    return this.http.post<Kursgruppe>(url, kursgruppe, this.httpOptions);
  }

  /**
  * Liest alle Kurslogs
  * @returns Observable Kurslog-Array
  */
  getAllKursLogs(): Observable<Kurslog[]> {
    const url = `${this.baseUrl}/kurslogs`;
    return this.http.get<Kurslog[]>(url);
  }

  /**
  * Liest alle Kurslogs aber zählt diese zusammen
  * und gibt die Anzahl der Aufrufe zusammen mit dem Kurs zurück
  * @returns Observable any-Array
  */
  getAllKursLogsCounted(): Observable<any[]> {
    const url = `${this.baseUrl}/kurslogsCounted`;
    return this.http.get<any[]>(url);
  }

  /**
  * Fügt einen Kurslog hinzu anhand der Kurs ID
  * @param id Kurs ID
  * @returns Observable Kurslog
  */
  addKurslog(id: number): Observable<Kurslog> {
    const url = `${this.baseUrl}/kurslog_add/${id}`;
    return this.http.post<Kurslog>(url, this.httpOptions);
  }

  /**
  * Löscht alle Kurslogs anhand der Kurs ID
  * @param id Kurs ID
  * @returns Observable any-Array
  */
  deleteKurslogs(id: number): Observable<any> {
    const url = `${this.baseUrl}/kurslogdelete/${id}`;
    return this.http.delete<Kurslog>(url, this.httpOptions);
  }

}
