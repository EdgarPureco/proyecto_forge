import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

  constructor(public http: HttpClient){}

  public getProducts():Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
