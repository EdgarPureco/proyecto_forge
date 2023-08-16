import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supply } from '../models/supply';
import { Login } from '../models/login';
import { User } from '../models/user';
import { Supplier } from '../models/supplier';
import { ProductSupply } from '../models/productSupply';
import { SignUp } from '../models/signup';
import { Customer } from '../models/customer';

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
    return this.http.post<any>(this.baseUrl+'login/', body,{'headers':headers})
  }
  
  public signUp(user: SignUp):Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    return this.http.post<any>(this.baseUrl+'customers/signup/', body,{'headers':headers})
  }

  // ========================= PRODUCTS =========================================
  public getProducts():Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    return this.http.get(this.baseUrl+"products", {'headers':headers});
  }
  
  public getProduct(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<Product>(this.baseUrl+'products/'+id, {'headers':headers});
  }
  
  public getProductSupplies(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<Product>(this.baseUrl+'products/details/'+id, {'headers':headers});
  }

  
  public insertProduct(product:Product): Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    const body=JSON.stringify(product);
    return this.http.post<Product>(this.baseUrl+'products/', body,{'headers':headers})
    
  }
  
  public saveProductSupplies(id: string, supplies:ProductSupply[]): Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    const body=JSON.stringify({"id": id, "supplies": supplies});
    return this.http.post<ProductSupply[]>(this.baseUrl+'products/details/'+id, body,{'headers':headers})
    
  }
  
  
  public produceProduct(id: string, quantity:number): Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    const body=JSON.stringify({"productId": id, "quantity": quantity});
    return this.http.post<any>(this.baseUrl+'products/make/', body,{'headers':headers})
    
  }
  
  public updateProduct(id:string, product:Product): Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    const body=JSON.stringify(product);
    return this.http.put<Product>(this.baseUrl+'products/'+id, body,{'headers':headers})
    
  }
  
  public deleteProduct(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete(this.baseUrl+'products/'+id, {'headers':headers});
  }

  // ================================== SUPPLIER ================================================================

  public getSuppliers():Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get(this.baseUrl+"suppliers", {'headers':headers});
  }
  
  public getSupplier(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<Supplier>(this.baseUrl+'suppliers/'+id, {'headers':headers});
  }

  
  public insertSupplier(supply:Supplier): Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const body=JSON.stringify(supply);
    return this.http.post<Supplier>(this.baseUrl+'suppliers/', body,{'headers':headers})
    
  }
  
  public updateSupplier(id:string, supply:Supplier): Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const body=JSON.stringify(supply);
    return this.http.put<Supplier>(this.baseUrl+'suppliers/'+id, body,{'headers':headers})
    
  }
  
  public deleteSupplier(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete(this.baseUrl+'suppliers/'+id, {'headers':headers});
  }

  // ================================== SUPPLY ================================================================

  public getSupplies():Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get(this.baseUrl+"supplies", {'headers':headers});
  }
  
  public getSupply(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<Supply>(this.baseUrl+'supplies/'+id, {'headers':headers});
  }

  
  public insertSupply(supply:Supply): Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const body=JSON.stringify(supply);
    return this.http.post<Supply>(this.baseUrl+'supplies/', body,{'headers':headers})
    
  }
  
  public buySupply(id: string, quantity: number): Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const body=JSON.stringify({"supplyId": id, "quantity": quantity});
    return this.http.post<any>(this.baseUrl+'supplies/buy/', body,{'headers':headers})
    
  }
  
  public updateSupply(id:string, supply:Supply): Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const body=JSON.stringify(supply);
    return this.http.put<Supply>(this.baseUrl+'supplies/'+id, body,{'headers':headers})
    
  }
  
  public deleteSupply(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete(this.baseUrl+'supplies/'+id, {'headers':headers});
  }

   // ========================= USERS =========================================
   public getUsers():Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    return this.http.get(this.baseUrl+"users", {'headers':headers});
  }
  
  public getUser(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.get<User>(this.baseUrl+'users/'+id, {'headers':headers});
  }

  
  public insertUser(product:User): Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    const body=JSON.stringify(product);
    return this.http.post<User>(this.baseUrl+'users/', body,{'headers':headers})
    
  }
  
  public updateUser(id:string, product:User): Observable<any> {
    const  headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } 
    const body=JSON.stringify(product);
    return this.http.put<User>(this.baseUrl+'users/'+id, body,{'headers':headers})
    
  }
  
  public deleteUser(id:string):Observable<any> {
    const   headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return this.http.delete(this.baseUrl+'users/'+id, {'headers':headers});
}




   // ========================= CUSTOMERS =========================================

public saveOrder(id: string, card: any, items:any[]): Observable<any> {
  const  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  } 
  const body=JSON.stringify({"customerId": id, "card": card, "items": items});
  return this.http.post<any[]>(this.baseUrl+'customers/buy/', body,{'headers':headers})
  
}

public setDelivered(id: string, ): Observable<any> {
  const  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  } 
  const body=JSON.stringify({"orderId": id});
  return this.http.post<any[]>(this.baseUrl+'orders/markasdelivered/', body,{'headers':headers})
  
}

public setReceived(id: string, ): Observable<any> {
  const  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  } 
  const body=JSON.stringify({"orderId": id});
  return this.http.post<any[]>(this.baseUrl+'orders/markasreceived/', body,{'headers':headers})
  
}

public getOrders(): Observable<any> {
  const  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  } 
  return this.http.get<any[]>(this.baseUrl+'orders/',{'headers':headers})
  
}

public getCustomerOrders(): Observable<any> {
  const  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  } 
  const body=JSON.stringify({"customerId": localStorage.getItem('id')});
  return this.http.post<any>(this.baseUrl+'customers/orders/',body,{'headers':headers})
  
}

public updateCustomer(customer: Customer): Observable<any> {
  const  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  } 
  const body=JSON.stringify(customer);
  return this.http.post<any>(this.baseUrl+'customers/updatedata/',body,{'headers':headers})
  
}


}