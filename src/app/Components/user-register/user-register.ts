import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CommonModule, JsonPipe} from '@angular/common';
import {IUser} from '../../Models/iuser';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-user-register',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    CommonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInput
  ],
  templateUrl: './user-register.html',
  styleUrl: './user-register.scss'
})
export class UserRegister implements OnInit {
  userRegisterForm!: FormGroup;
  referralOptions = [
    {label: 'Friend', value: 'friend'},
    {label: 'Social Media', value: 'social'},
    {label: 'Advertisement', value: 'ad'},
    {label: 'Other', value: 'other'}
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50) // limit long names
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      phoneNumbers: this.fb.array([this.createPhoneControl()]),
      address: this.fb.group({
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        postalCode: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{4,10}$/) // numeric postal codes
          ]
        ],
        street: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
      }),
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
          // at least 1 uppercase & 1 digit
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ],
      referral: ['', Validators.required],      // selected radio value
      referralOther: ['']
    }, {
      validators: this.passwordMatchValidator // custom group-level validator
    });

    this.referral!.valueChanges.subscribe(value => {
      const otherCtrl = this.referralOther!;
      if (value === 'other') {
        otherCtrl.setValidators([Validators.required, Validators.minLength(2)]);
      } else {
        otherCtrl.clearValidators();
        otherCtrl.setValue(''); // optional: clear text when not needed
      }
      otherCtrl.updateValueAndValidity({onlySelf: true});
    });
  }

  private createPhoneControl(initialValue: string = '') {
    return this.fb.control(initialValue, [
      Validators.required,
      Validators.pattern(/^[0-9]{10,15}$/)
    ]);
  }

  get fullName() {
    return this.userRegisterForm.get('fullName');
  }

  get email() {
    return this.userRegisterForm.get('email');
  }

  get phoneNumbers(): FormArray {
    return this.userRegisterForm.get('phoneNumbers') as FormArray;
  }

  /** Helper to access control at index */
  phoneControl(index: number): AbstractControl {
    return this.phoneNumbers.at(index);
  }

  /** Add a new phone control */
  addPhone() {
    this.phoneNumbers.push(this.createPhoneControl());
    // Optionally focus the new input (requires ViewChildren and logic)
  }

  /** Remove phone control at index */
  removePhone(index: number) {
    if (this.phoneNumbers.length > 1) { // keep at least one if you want
      this.phoneNumbers.removeAt(index);
    } else {
      // Optionally reset the only control instead of removing
      this.phoneNumbers.at(0).reset();
    }
  }

  /** trackBy for ngFor performance */
  trackByIndex(index: number) {
    return index;
  }


  get address() {
    return this.userRegisterForm.get('address');
  }

  get city(): AbstractControl | null {
    return this.userRegisterForm.get('address.city');
  }

  get postalCode(): AbstractControl | null {
    return this.userRegisterForm.get('address.postalCode');
  }

  get street(): AbstractControl | null {
    return this.userRegisterForm.get('address.street');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }

  get referral() {
    return this.userRegisterForm.get('referral');
  }

  get referralOther() {
    return this.userRegisterForm.get('referralOther');
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  submit() {
    let userModel = this.userRegisterForm.value as IUser;
    // Call API, send UserModel
    console.log(userModel);
  }


  protected readonly name = name;
}
