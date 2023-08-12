import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;
    isLoggedIn : boolean = false

    constructor(private router: Router, private authService: AuthService){}

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
        localStorage.getItem('isLoggedIn') == 'true'? this.isLoggedIn = true : false;

        if(this.isLoggedIn){
            this.items = [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    routerLink: '/home'
                },  
                {
                    label: 'Show All',
                    icon: 'pi pi-fw pi-bars',
                    routerLink: '/products'
                },  
                {
                    label: 'Window Frames',
                    icon: 'pi pi-fw pi-microsoft',
                    routerLink: '/home'
                },
                {
                    label: 'Door Frames',
                    icon: 'pi pi-fw pi-tablet',
                    routerLink: '/home'
                },
                {
                    label: 'Pots',
                    icon: 'pi pi-fw pi-apple'
                },
            ];
        }
  }
}
