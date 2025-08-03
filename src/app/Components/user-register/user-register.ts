import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './user-register.html',
  styleUrl: './user-register.scss'
})
export class UserRegister {
  userRegisterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userRegisterForm = fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: [''],
      phoneNo: [''],
      address: fb.group({
        city: [''],
        postalCode: [''],
        street: [''],
      }),
      password: [''],
      confirmPassword: [''],
    })
  }

  get fullName() {
    return this.userRegisterForm.get('fullName');
  }

}
