import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiService } from '../../services/api.service';
import { MessageService, SelectItem } from 'primeng/api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]
})

export class ProductsComponent {
  products!: Product[];

  cart!: any[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;


  constructor(public apiService: ApiService,private sanitizer: DomSanitizer,private messageService: MessageService,) { }

  ngOnInit() {

    this.apiService.getProducts().subscribe(
      (response) => { 
        this.products = response;
        this.products.forEach(element => {
          const base64String = element.image 
          var url: SafeUrl;
          url = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64String);
          element.image = url;
          element.price = Math.fround(element.price!);
      }); 
       },
      (e) => {
        console.error(e);
      }
    );
    this.sortOptions = [
      { label: 'Precio Descendente', value: '!price' },
      { label: 'Precio Ascendente', value: 'price' }
    ];
  }

  addToCart(product: Product) {
    let tmp = localStorage.getItem("cart");

    var newP = {
      "id": product.id, 
      "name": product.name, 
      "price": product.price, 
      "image": product.image['changingThisBreaksApplicationSecurity'], 
      "quantity":1
    };

    !tmp ? this.cart = [] : this.cart = JSON.parse(tmp);
    

    
    if(this.checkItemCart(product.id!.toString())) {

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cantidad de producto aumentada', life: 3000 })
    }
    else{
      this.cart.push(newP)
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto agregado al carrito', life: 3000 })
    }

    localStorage.setItem("cart", JSON.stringify(this.cart));
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

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
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
  
checkItemCart(id: string): boolean {
    for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id == id) {
          this.cart[i].quantity = this.cart[i].quantity+ 1
          return true
        }
    }

    return false;
}

}
