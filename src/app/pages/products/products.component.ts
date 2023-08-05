import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ApiService } from '../../services/api.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  products?: any = null

  layout: string = 'list' as '"list" | "grid"';

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;


  constructor(public apiService: ApiService) { }

  ngOnInit() {

    this.apiService.getProducts().subscribe(
      (response) => { this.products = response; console.log(response); },
      (e) => {
        console.error(e);
      }
    );
    // this.apiService.getProduct('TZy1m').subscribe(
    //   (response) => { this.products = response.results; console.log(response.results); },
    //   (e) => {
    //     console.error(e);
    //   }
    // );
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
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

}
