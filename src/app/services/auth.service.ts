import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true") {
       status = true;
    }
    else {
       status = false;
    }
    return status;
 }
}  