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
    dropdown: MenuItem[] | undefined;
    isLoggedIn : boolean = false

    badge = 0;

    constructor(private router: Router, private authService: AuthService){}

    logout() {
        this.authService.logout();
    }

    ngOnInit() {
        localStorage.getItem('isLoggedIn') == 'true'? this.isLoggedIn = true : false;
        let tmp = localStorage.getItem("cart");
        !tmp ? this.badge = 0 : this.badge = JSON.parse(tmp).length;
        if(this.isLoggedIn){
            this.items = [
                {
                    label: 'Inicio',
                    icon: 'pi pi-fw pi-home',
                    routerLink: '/home'
                },  
                {
                    label: 'Todos',
                    icon: 'pi pi-fw pi-bars',
                    routerLink: '/products'
                },  
                {
                    label: 'Marcos de Ventana',
                    icon: 'pi pi-fw pi-microsoft',
                    routerLink: '/home'
                },
                {
                    label: 'Marcos de Puerta',
                    icon: 'pi pi-fw pi-tablet',
                    routerLink: '/home'
                },
                {
                    label: 'Maceteros',
                    icon: 'pi pi-fw pi-apple'
                },
            ];

            this.dropdown = [
                {
                    label: 'Cuenta',
                    items: [
                        {
                            label: 'Mi perfil',
                            icon: 'pi pi-id-card',
                            routerLink: '/profile'
                        },
                        {
                            label: 'Mis pedidos',
                            icon: 'pi pi-dollar',
                            routerLink: '/myOrders'
                        },
                        {
                            label: 'Cerrar Sesión',
                            icon: 'pi pi-external-link',
                            command: () => {
                                this.logout();
                            }
                        }
                    ]
                }
            ];
        }
  }
}
