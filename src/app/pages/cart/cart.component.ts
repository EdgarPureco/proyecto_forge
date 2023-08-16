import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
    total: number = 0;
    Delete = 'Delete'
    productDialog: boolean = false;

    products!: Product[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    checkoutForm: FormGroup;

    monthOptions!: any[];
    yearOptions!: any[];
    currentYear!: number;

    constructor(private apiService: ApiService,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private formBuilder: FormBuilder) {
        this.checkoutForm = this.formBuilder.group({
            cardNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            expiryMonth: ['', [Validators.required]],
            expiryYear: ['', [Validators.required]],
            cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
        });
    }

    ngOnInit() {
        let tmp = localStorage.getItem("cart");
        !tmp ? this.products = [] : this.products = JSON.parse(tmp);
        this.getTotal();
        this.monthOptions = [
            { label: 'Mes', value: '' },
            { label: '01', value: '01' },
            { label: '02', value: '02' },
            { label: '03', value: '03' },
            { label: '04', value: '04' },
            { label: '05', value: '05' },
            { label: '06', value: '06' },
            { label: '07', value: '07' },
            { label: '08', value: '08' },
            { label: '09', value: '09' },
            { label: '10', value: '10' },
            { label: '11', value: '11' },
            { label: '12', value: '12' }
        ];
        console.log(this.products);
        
        this.currentYear = new Date().getFullYear();
        this.yearOptions = Array.from({ length: 10 }, (_, i) => {
            const year = this.currentYear + i;
            return { label: year.toString(), value: year.toString() };
        });
        this.yearOptions[0] = {label:  'Año', value: ''}

    }

    getTotal() {
        this.products.forEach((p) => { if (p.price) this.total += p.price; });
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to remove ' + product.name + ' from your cart ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                localStorage.setItem("cart", JSON.stringify(this.products));
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Eliminado', life: 3000 });
                this.getTotal()
            }
        });
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


    increase(product: Product) {
        product.quantity = product.quantity! + 1;
        this.products[this.findIndexById(product.id!)] = product;
    }

    reduce(product: Product) {
        if (product.quantity! > 1) {
            product.quantity = product.quantity! - 1;
            this.products[this.findIndexById(product.id!)] = product;
        }
    }

    onSubmit() {
        if (this.checkoutForm.valid) {
            var id = localStorage.getItem('id');
            var card = {
                "cardNumber": this.checkoutForm.value.cardNumber,
                "expirationDate": this.checkoutForm.value.expiryMonth + this.checkoutForm.value.expiryYear,
                "cvv": this.checkoutForm.value.cvv
            };
            var items: any[] = []
            this.products.forEach((item) => {
                items.push(
                    {
                        "productId": item.id,
                        "quantity": item.quantity
                    }
                );
            })

            this.apiService.saveOrder('4', card, items).subscribe(
                response => {
                    if (response.success) {
                        localStorage.removeItem('cart')
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Su orden ha sido enviada', life: 3000 });
                        (async () => { 
                            await this.delay(1000);
                    
                            window.location.reload();
                        })();
                    } else {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algunos de los productos se han agotado', life: 3000 });
                    }
                },
                error => {
                    console.error('Error en la solicitud:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error del servidor, intente de nuevo', life: 3000 });
                }
            );

        } else {
            console.log('Form is invalid');
        }
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

}