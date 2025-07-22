import {Injectable} from '@angular/core';
import {IProduct} from '../Models/IProduct';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.API_URL;
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCatID(CatID: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.apiUrl}/products?categoryId=${CatID}`);
  }

  addProduct(newPrd: IProduct) {
  }

  updateProduct(id: number, updatedPrd: IProduct) {
  }

  deleteProduct(id: number) {

  }
}
