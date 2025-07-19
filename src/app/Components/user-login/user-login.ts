import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../Services/user-auth-service';

@Component({
  selector: 'app-user-login',
  imports: [],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss'
})
export class UserLogin implements OnInit {
  isUserLoggedIn: boolean = false;
  constructor(private userAuthService: UserAuthService) {
  }

  ngOnInit() {
    this.isUserLoggedIn = this.userAuthService.isUserLogged;
  }

  login()
  {
    this.userAuthService.login();
    this.isUserLoggedIn = this.userAuthService.isUserLogged;
  }

  logout()
  {
    this.userAuthService.logout();
    this.isUserLoggedIn = this.userAuthService.isUserLogged;
  }

}
