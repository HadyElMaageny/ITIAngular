import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericAPIService {
  private readonly baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  getAll<T>(route: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${route}`).pipe(
      retry(2),
      catchError(this.handleError<T>('getAll'))
    );
  }

  getById<T>(route: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${route}/${id}`).pipe(
      catchError(this.handleError<T>('getById'))
    );
  }

  create<T>(route: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${route}`, item).pipe(
      catchError(this.handleError<T>('create'))
    );
  }

  update<T>(route: string, id: number | string, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${route}/${id}`, item).pipe(
      catchError(this.handleError<T>('update'))
    );
  }

  delete(route: string, id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${route}/${id}`).pipe(
      catchError(this.handleError<void>('delete'))
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
