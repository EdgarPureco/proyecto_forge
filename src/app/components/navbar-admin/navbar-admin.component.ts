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
                icon: 'pi pi-fw pi-chart-bar'
            },
            {
                label: 'Products',
                icon: 'pi pi-fw pi-box',
                items: [
                    {
                        label: 'See All',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: '/admin/products'
                    },
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: '/admin/new-product'
                    },
                ]
            },
            {
                label: 'Supplies',
                icon: 'pi pi-fw pi-list',
                items: [
                    {
                        label: 'See All',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: '/admin/supplies'
                    },
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: '/admin/new-supply'
                    },
                    {
                        label: 'Suppliers',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: 'See All',
                                icon: 'pi pi-fw pi-eye',
                                routerLink: '/admin/suppliers'
                            },
                            {
                                label: 'New',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: '/admin/new-supplier'
                            },
                        ]
                    },
                ]
            },

            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'See All',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: '/admin/users'
                    },
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: '/admin/new-user'
                    },
                ]
            },
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-user',
                routerLink: '/admin/customers'
            },

        ];
    }
}
