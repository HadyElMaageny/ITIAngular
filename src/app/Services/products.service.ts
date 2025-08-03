import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map, Observable, retry, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {IProduct} from '../Models/IProduct';
import {GenericAPIService} from './generic-a-p-i.service';
import {APIResponseVm} from '../ViewModels/apiresponse-vm';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly route = 'products';

  constructor(private http: HttpClient, private genericApiService: GenericAPIService) {
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.genericApiService.getAll<IProduct[]>(this.route);
    // return this.http.get<IProduct[]>(`${this.apiUrl}/products`)
    //   .pipe(
    //     catchError(this.handleError<IProduct[]>('getAllProducts'))
    //   );
  }

  getProductById(id: number): Observable<IProduct> {
    // return this.http.get<IProduct>(`${this.apiUrl}/products/${id}`)
    //   .pipe(
    //     catchError(this.handleError<IProduct>('getProductById'))
    //   );
    return this.genericApiService.getById<IProduct>(this.route, id);
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.genericApiService.create<IProduct>(this.route, product);
  }

  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.genericApiService.update<IProduct>(this.route, id, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.genericApiService.delete(this.route, id);
  }

  getProductsByCatID(catID: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.API_URL}/products?categoryID=${catID}`)
      .pipe(
        catchError(this.handleError<IProduct[]>('getProductsByCatID'))
      );
  }

  // addProduct(newPrd: IProduct): Observable<IProduct> {
  //   return this.http.post<IProduct>(`${this.apiUrl}/products`, JSON.stringify(newPrd), httpOptions)
  //     .pipe(
  //       retry(3),
  //       catchError(this.handleError<IProduct>('addProduct'))
  //     );
  // }

  private setHeader(key: string, value: string) {
    httpOptions.headers.set(key, value);
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
