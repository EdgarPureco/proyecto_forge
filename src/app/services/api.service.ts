import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'api/';

  constructor(public http: HttpClient){}

  public getProducts():Observable<any> {
    return this.http.get(this.baseUrl+"products");
  }
  
  public getProduct(id:string):Observable<any> {
    return this.http.get<Product>(this.baseUrl+'products/'+id);
  }

  
  public insertProduct(product:Product): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    return this.http.post<Product>(this.baseUrl+'products/', body,{'headers':headers})
    
  }
  
  public updateProduct(id:string, product:Product): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(product);
    return this.http.put<Product>(this.baseUrl+'products/'+id, body,{'headers':headers})
    
  }
  
  public deleteProduct(id:string):Observable<any> {
    return this.http.delete(this.baseUrl+'products/'+id);
  }
}
