import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supply } from '../models/supply';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'api/';

  constructor(public http: HttpClient){}

  // ========================= LOGIN & SIGNUP =========================================
  public login(user: Login):Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    return this.http.post<Product>(this.baseUrl+'login/', body,{'headers':headers})
  }

  // ========================= PRODUCTS =========================================
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

  // ================================== SUPPLY ================================================================

  public getSupplies():Observable<any> {
    return this.http.get(this.baseUrl+"supplies");
  }
  
  public getSupply(id:string):Observable<any> {
    return this.http.get<Supply>(this.baseUrl+'supplies/'+id);
  }

  
  public insertSupply(supply:Supply): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(supply);
    return this.http.post<Supply>(this.baseUrl+'supplies/', body,{'headers':headers})
    
  }
  
  public updateSupply(id:string, supply:Supply): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(supply);
    return this.http.put<Supply>(this.baseUrl+'supplies/'+id, body,{'headers':headers})
    
  }
  
  public deleteSupply(id:string):Observable<any> {
    return this.http.delete(this.baseUrl+'supplies/'+id);
  }
}
