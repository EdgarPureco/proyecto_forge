import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CartComponent {

  test = 0;
  total:number = 0;
  Delete = 'Delete'
  productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.apiService.getProducts().subscribe((data) => {this.products = data; this.getTotal()}); 
    }

    getTotal(){
      this.products.forEach((p)=>{if(p.price)this.total+=p.price;});
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
            message: 'Are you sure you want to remove ' + product.name + ' from your cart ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                this.getTotal()
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
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
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

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(product: Product) {
      console.log(product.inventoryStatus);
      
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