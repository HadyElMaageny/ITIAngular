// Sync Validator
// emailExistsValidator(existEmail: string[]): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const emailVal = control.value;
//
//     if (!emailVal) return null;
//
//     let validationError = {"existEmail": {value: emailVal}};
//     let foundEmail = existEmail.includes(emailVal);
//
//     return foundEmail ? validationError : null;
//   }
// }

//Async Validator
import {delay, map, Observable, of} from 'rxjs';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export function emailExistsValidator(existingEmails: string[]) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;

    if (!email) return of(null); // Don't validate empty

    // Simulate API check (replace with HttpClient call)
    return of(existingEmails.includes(email)).pipe(
      delay(500), // simulate network latency
      map(exists => exists ? {emailExists: true} : null)
    );
  };
}
