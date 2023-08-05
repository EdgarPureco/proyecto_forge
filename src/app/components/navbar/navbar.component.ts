import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router){}

    toLogin(){
        this.router.navigate(['login']);
    }
    
    toSignup(){
        this.router.navigate(['signup']);
    }
    ngOnInit() {
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
