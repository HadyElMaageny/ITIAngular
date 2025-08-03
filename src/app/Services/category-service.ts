import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GenericAPIService} from './generic-a-p-i.service';
import {Observable} from 'rxjs';
import {ICategory} from '../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl: string = environment.API_URL;

  constructor(private http: HttpClient, private genericApiHandler: GenericAPIService) {
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.genericApiHandler.getAll<ICategory[]>('categories');
  }
}
