import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';

import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: User;

  submitted = false;
  userOrPasswordIncorrect = false;

  constructor(private usersService: UsersService,
    private _router: Router) {
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Username: new FormControl(this.user.Username, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ]),
      Password: new FormControl(this.user.Password, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ])
    });
  }

  get Username() {
    return this.loginForm.get('Username')!;
  }

  get Password() {
    return this.loginForm.get('Password')!;
  }

  /**
  * Überprüft ob bei der Anmeldung ein Error aufgrund falscher Anmeldedaten auftritt
  * @returns True wenn Anmeldedaten falsch sind, Flase wenn anmeldedaten korrekt sind
  */
  checkuserOrPasswordIncorrectError() {
    if (this.submitted == true && this.userOrPasswordIncorrect == true) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * Schickt Anmeldedaten via Userservices an Backend
  */
  onSubmit() {
    this.user.Username = this.loginForm.value.Username;
    this.user.Password = this.loginForm.value.Password;

    this.usersService.loginUser(this.user).subscribe((response: any) => {
      this.submitted = true;
      localStorage.setItem('token', response.token);
      this.userOrPasswordIncorrect = false;
      this._router.navigate(['/admin/uebersicht/kursuebersicht'])
    }, (error) => {
      this.userOrPasswordIncorrect = true;
      this.submitted = true
    })

  }

}
