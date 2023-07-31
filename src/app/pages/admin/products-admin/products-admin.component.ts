import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-products-admin',
    templateUrl: './products-admin.component.html',
    styleUrls: ['./products-admin.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {
    Delete = 'Delete'
    productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(
        private apiService: ApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.apiService.getProducts().subscribe(
            (response) => { this.products = response; console.log(response); },
            (e) => {
                console.error(e);
            }
        );
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }


    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                product.id ? 
                this.apiService.deleteProduct(product.id).subscribe(
                    ()=>this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 }),
                    (e)=>{
                        this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'Product Not Deleted', life: 3000 })
                    }
                    ) 
                    : this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Not Deleted', life: 3000 })
                    
                this.product = {};
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.apiService.insertProduct(this.product).subscribe(
                    ()=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 })
                    },
                    (e)=>{
                        console.log(e);
                        this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'Product Not Updated', life: 3000 })
                    }
                    );
            } else {
                this.product.image = 'null';
                this.apiService.insertProduct(this.product).subscribe(
                    ()=>{
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 }),
                    this.products.push(this.product)
                    },
                    (e)=>{
                        console.log(e);
                        this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'Product Not Added', life: 3000 })
                    }
                    );
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};

        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return 'OUTOFSTOCK';
        }
    };
}