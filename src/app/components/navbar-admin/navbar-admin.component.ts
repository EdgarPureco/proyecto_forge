import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
    items: MenuItem[] | undefined;

    constructor(private router: Router, private authService: AuthService) { }

    logout() {
        this.authService.logout();
    }


    ngOnInit() {

        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: '/admin/dashboard'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-box',
                routerLink: '/admin/products'
            },
            {
                label: 'Insumos',
                icon: 'pi pi-fw pi-list',
                routerLink: '/admin/supplies',
            },
            {
                label: 'Proveedores',
                icon: 'pi pi-fw pi-box',
                routerLink: '/admin/suppliers'
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-user',
                routerLink: '/admin/users'
            },
            {
                label: 'Ordenes',
                icon: 'pi pi-fw pi-dollar',
                routerLink: '/admin/orders'
            },

        ];
    }
}
