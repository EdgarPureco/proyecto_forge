import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { ApiService } from 'src/app/services/api.service';
import { Validators,FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: Login = {}

  loginForm: FormGroup = new FormGroup({
    'login': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
});
    
  submitted = false;

  constructor(public apiService: ApiService){

  }


onSubmit() { 
    this.submitted = true;
    alert(JSON.stringify(this.loginForm.value));
}

  toLogin(){
    if(this.user.email && this.user.password){
      this.apiService.login(this.user).subscribe((response)=>{console.log(response);
      });
      
      
    }
  }
}
