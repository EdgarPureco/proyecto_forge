import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SignUp } from 'src/app/models/signup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent {
  names?: string
  lastNames?: string
  address?: string
  phone?: string
  email?: string
  password?: string
  confirmPassword?: string

  constructor(
    private router: Router,
    public apiService: ApiService,
    public authService: AuthService,
    private messageService: MessageService
  ) { }

  returnUrl: string = '';

  signUp() {
    if (
      this.names &&
      this.lastNames &&
      this.address &&
      this.phone &&
      this.email &&
      this.password &&
      this.confirmPassword
    ) {
      if (this.password == this.confirmPassword) {
        var data: SignUp = {
          names: this.names,
          lastNames: this.lastNames,
          address: this.address,
          phone: this.phone,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        }

        data.password = btoa(data.password);
        data.confirmPassword = btoa(data.confirmPassword);


        this.apiService.signUp(data).subscribe((response) => {
          console.log(response['error']);
          
          if (response['status']==200) {

            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('id', response['id']);
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
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas deben coincidir', life: 2000 })
      }
    }
  }


}
