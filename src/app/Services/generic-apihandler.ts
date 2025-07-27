import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {APIResponseVm} from '../ViewModels/apiresponse-vm';
import {Observable, retry, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IProduct} from '../Models/IProduct';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
  })
};
const apiUrl: string = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class GenericAPIHandler {


  constructor(private http: HttpClient) { }

  getAll(apiRoute: string): Observable<APIResponseVm> {
    return this.http.get<APIResponseVm>(`${apiUrl}/${apiRoute}`).pipe(
      retry(3),
      catchError(this.handleError<APIResponseVm>('getAll ' + apiRoute))
    );
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // Log to console (consider using a proper logging service)
      console.error(`${operation} failed:`, error);

      // Create a more specific error message based on the error type
      let errorMessage: string;
      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `A client error occurred: ${error.error.message}`;
      } else if (error.status === 0) {
        // Network unreachable
        errorMessage = 'The server could not be reached. Please check your network connection.';
      } else if (error.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (error.status === 401) {
        errorMessage = 'Authentication required. Please log in.';
      } else if (error.status === 403) {
        errorMessage = 'You do not have permission to perform this action.';
      } else if (error.status >= 500) {
        errorMessage = 'A server error occurred. Please try again later.';
      } else {
        // Other server errors
        errorMessage = `Server returned code ${error.status} with message: ${error.message}`;
      }

      return throwError(() => new Error(errorMessage));
    };
  }
}
