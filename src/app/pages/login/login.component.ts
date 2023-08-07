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
  ) {

  }
  user: Login = {}

  message: string = '';
  returnUrl: string = '';

  submitted = false;

  ngOnInit() {
    this.returnUrl = '/admin/dashboard';
    this.authService.logout();
  }




  toLogin() {

    if (this.user.email && this.user.password) {
      this.apiService.login(this.user).subscribe((response) => {
        console.log(response);
        if(response['authenticated']){
          localStorage.setItem('isLoggedIn', "true");
          console.log("Login successful");
          localStorage.setItem('token', response['token']);
          // this.router.navigate([this.returnUrl]);
        }else{
          this.messageService.add({  key: 'bc', severity: 'error', summary: 'Error', detail: response['message'] });
        }
      });
    }
    else {
      this.messageService.add({  key: 'bc', severity: 'warn', summary: 'Attention', detail: 'Please fill all the champs'});
    }
  }




}
