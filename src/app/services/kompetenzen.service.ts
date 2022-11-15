import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map } from 'rxjs';

import { Kompetenz } from '../interfaces/kompetenz';

import { KOMPETENZEN } from './mock-kompetenzen';

@Injectable({
  providedIn: 'root'
})
export class KompetenzenService {

  private baseUrl = "http://localhost:4566";  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getAllKompetenzen(): Observable<Kompetenz[]> {
    const url = `${this.baseUrl}/kompetenzen`;
    return this.http.get<Kompetenz[]>(url);
  }

  getKompetenzByID(id: number): Observable<Kompetenz> {
    const url = `${this.baseUrl}/kompetenzByID/${id}`;
    return this.http.get<Kompetenz>(url);
  }

  addKompetenz(kompetenz: Kompetenz): Observable<Kompetenz> {
    const url = `${this.baseUrl}/kompetenz_add`;
    return this.http.post<Kompetenz>(url, kompetenz);
  }

  updateKompetenz(kompetenz: Kompetenz): Observable<any> {
    const url = `${this.baseUrl}/kompetenz_update/${kompetenz.id}`;
    return this.http.put(url, kompetenz, this.httpOptions);
  }

  deleteKompetenz(id: number): Observable<Kompetenz> {
    const url = `${this.baseUrl}/kompetenz_delete/${id}`;
    return this.http.delete<Kompetenz>(url, this.httpOptions);
  }

}
