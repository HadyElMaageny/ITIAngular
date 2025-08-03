import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-register.html',
  styleUrl: './user-register.scss'
})
export class UserRegister {
  userRegisterForm: FormGroup;

  constructor() {
    this.userRegisterForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      phoneNo: new FormControl(),
      address: new FormGroup({
        city: new FormControl(),
        postalCode: new FormControl(),
        street: new FormControl(),
      }),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    })
  }

}
