import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {UserAuthService} from '../../Services/user-auth-service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  isUserLoggedIn: boolean;

  constructor(private userAuthService: UserAuthService) {
    this.isUserLoggedIn = this.userAuthService.isUserLogged
  }

  ngOnInit() {
    // this.isUserLoggedIn = this.userAuthService.isUserLogged;
    this.userAuthService.getLoggedStatus().subscribe(loggedStatus => {
      this.isUserLoggedIn = loggedStatus;
    });
  }

}
