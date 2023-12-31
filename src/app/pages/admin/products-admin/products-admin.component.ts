import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductSupply } from 'src/app/models/productSupply';
import { Supply } from 'src/app/models/supply';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-products-admin',
    templateUrl: './products-admin.component.html',
    styleUrls: ['./products-admin.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {
    Delete = 'Delete'
    productDialog: boolean = false;
    editSuppliesDialog: boolean = false;
    produceDialog: boolean = false;

    addSuppliesDialog: boolean = false;

    products!: Product[];

    product!: Product;

    productSupplies!: Supply[] ;

    otherSupplies!: Supply[] ;

    selectedSupplies!: Supply[];

    sendSupplies!: ProductSupply[];

    submitted: boolean = false;

    statuses!: any[];

    quantity!: number;

    constructor(
        private apiService: ApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.apiService.getProducts().subscribe(
            (response) => { 
                
                this.products = response; 
                this.products.forEach(element => {
                    const base64String = element.image 
                    var url: SafeUrl;
                    url = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64String);
                    element.image = url;
                }); 
            },
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
    
    openProduce(product: Product) {
        this.product = { ...product };
        this.quantity = 1;
        this.produceDialog = true;
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
                        () => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Eliminado', life: 3000 }),
                        (e) => {
                            this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Producto No Eliminado', life: 3000 })
                        }
                    )
                    : this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Producto No Eliminado', life: 3000 })

                this.product = {};
            }
        });
    }

    onUpload(event: UploadEvent) {
        for (let file of event.files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64Value = reader.result.toString().split(",")[1];
                    this.product.image = base64Value
                }
            };
            reader.readAsDataURL(file);

        }

        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
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
                this.apiService.updateProduct(this.product.id, this.product).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Actualizado', life: 3000 })
                    },
                    (e) => {
                        console.log(e);
                        this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Producto No Actualizado', life: 3000 })
                    }
                );
            } else {
                this.add()
                this.apiService.insertProduct(this.product).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Added', life: 3000 })
                    },
                    (e) => {
                        console.log(e);
                        this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Producto No Added', life: 3000 })
                    }
                );
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};

        }
    }


    add(){
        this.products.push(this.product)
    }
    
    produce(){
        this.apiService.produceProduct(this.product.id!, this.quantity).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Producido', life: 3000 })
            },
            (e) => {
                this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Producto No Fue Producido', life: 3000 })
            }
        );

        this.produceDialog=false;
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
            case 'En inventario':
                return 'success';

            case 'Poco inventario':
                return 'warning';

            case 'Sin inventario':
                return 'danger';

            default:
                return 'Sin inventario';
        }
    };

    // ========================================================================================

    
    getProductSupplies(){
        this.apiService.getProductSupplies(this.product.id!.toString()).subscribe(
            (response) => { 
                this.productSupplies = response['productSupplies']; 
                this.otherSupplies = response['otherSupplies']; 
                
            },
            (e) => {
                console.error(e);
            }
        );
    }

    editSupplies(product: Product) {
        this.product = { ...product };
        this.getProductSupplies()
        this.editSuppliesDialog = true;
    }
    
    addSupplies(product: Product)  {
        this.product = { ...product };
        this.getProductSupplies()
        this.addSuppliesDialog = true;

    }

    saveSupplies(){
        this.submitted = true;
        this.sendSupplies = []
        this.selectedSupplies.forEach((item)=>{
            var tmp: ProductSupply = {}
            tmp.supplyId = item.id
            tmp.quantity = item.quantity
            this.sendSupplies.push(tmp)
        });
        this.apiService.saveProductSupplies(this.product.id!.toString(), this.sendSupplies).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supplies Actualizado', life: 3000 })
            },
            (e) => {
                console.log(e);
                this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Supplies No Actualizado', life: 3000 })
            }
        );
        
        if(this.editSuppliesDialog)this.editSuppliesDialog=false
        if(this.addSuppliesDialog)this.addSuppliesDialog=false
        
    }

    findIndexEdit(id: string): number {
        let index = -1;
        for (let i = 0; i < this.productSupplies.length; i++) {
            if (this.productSupplies[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
    
    findIndexAdd(id: string): number {
        let index = -1;
        for (let i = 0; i < this.otherSupplies.length; i++) {
            if (this.otherSupplies[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
        
}