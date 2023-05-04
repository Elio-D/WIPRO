import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "http://localhost:4566";  
  //private baseUrl = "http://wipro-hs22-mstrebel.enterpriselab.ch:8080";  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient,
    private _router: Router) { }

    /**
    * Führt das Login mit den User Daten durch
    * @param user Login Daten
    */
    loginUser(user: User){
      const url = `${this.baseUrl}/login`;
      return this.http.post<any>(url, user);
    }
  
    loggedIn() {
      return !!localStorage.getItem('token')
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    logoutUser(){
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      this._router.navigate(['/login']);
    }
    
}
