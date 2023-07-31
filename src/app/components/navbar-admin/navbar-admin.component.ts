import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar-admin.component.html',
    styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
    items: MenuItem[] | undefined;

    constructor(private router: Router) { }

    logout() {
        this.router.navigate(['login']);
    }


    ngOnInit() {

        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-chart-bar',
                routerLink: '/admin/dashboard'
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-box',
                routerLink: '/admin/products'
            },
            {
                label: 'Supplies',
                icon: 'pi pi-fw pi-list',
                routerLink: '/admin/supplies',
            },
            {
                label: 'Suppliers',
                icon: 'pi pi-fw pi-box',
                routerLink: '/admin/suppliers'
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                routerLink: '/admin/users'
            },
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-user',
                routerLink: '/admin/customers'
            },

        ];
    }
}
