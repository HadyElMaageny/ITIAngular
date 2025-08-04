import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-user-register',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './user-register.html',
  styleUrl: './user-register.scss'
})
export class UserRegister implements OnInit {
  userRegisterForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: [''],
      address: this.fb.group({
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

  get email() {
    return this.userRegisterForm.get('email');
  }

  get phoneNo() {
    return this.userRegisterForm.get('phoneNo');
  }

  get address() {
    return this.userRegisterForm.get('address');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }

  protected readonly name = name;
}
