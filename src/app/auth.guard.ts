import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UsersService,
    private _router: Router){}

  canActivate(){
    if (this.userService.loggedIn()){
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
  
}
