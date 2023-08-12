import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    public apiService: ApiService,
    public authService: AuthService,
    private messageService: MessageService
  ) { }
  user: Login = {}


  returnUrl: string = '';

  submitted = false;

  ngOnInit() {
    
    if(this.authService.isLoggedIn()==true){
      var tmp = localStorage.getItem('role');
      if(tmp!=null){
        tmp.includes('admin')? this.router.navigate(['/admin/dashboard']) :
        this.router.navigate(['/home']);
      } 
    }
  }


  toLogin() {
    if (this.user.email && this.user.password) {
      this.apiService.login(this.user).subscribe((response) => {
        if (response['authenticated']) {

          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('role', response['role']);
          localStorage.setItem('name', response['name']);
          localStorage.setItem('token', response['token']);

          localStorage.getItem('role')?.includes('customer') 
            ? this.returnUrl = '/home' : this.returnUrl = '/admin/dashboard';
            
          this.router.navigate([this.returnUrl]);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response['message'], life: 2000 })
        }
      });
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Please fill all the champs', life: 2000 });
    }
  }




}
