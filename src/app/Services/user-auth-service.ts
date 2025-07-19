import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  isLoggedSubject: BehaviorSubject<boolean>;

  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login() {
    let token = "12345678"
    localStorage.setItem("token", token);
    this.isLoggedSubject.next(true);
  }

  logout() {
    localStorage.removeItem("token");
    this.isLoggedSubject.next(false);
  }

  get isUserLogged(): boolean {
    return !!localStorage.getItem("token");
  }

  getLoggedStatus(): Observable<boolean>
  {
    return this.isLoggedSubject.asObservable();
  }
}
