import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Orders } from 'src/app/models/orders';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class CustomerOrdersComponent implements OnInit {

  detailsDialog: boolean = false;

  orders!: Orders[];

  role!: string;

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

ngOnInit() {
    this.role = localStorage.getItem('role')!;
    this.apiService.getCustomerOrders().subscribe(
        (response) => { 
            
            this.orders = response;
            console.log(this.orders);
            
        },
        (e) => {
            console.error(e);
        }
    );
}

getOrders(){
    this.apiService.getOrders().subscribe(
        (response) => { 
            
            this.orders = response;
            console.log(this.orders);
            
        },
        (e) => {
            console.error(e);
        }
    );
}

setDelivered(id: string){
    this.apiService.setDelivered(id).subscribe(
        (response) => {             
            this.getOrders()
        },
        (e) => {
            console.error(e);
        }
    );
}

setReceived(id: string){
    this.apiService.setReceived(id).subscribe(
        (response) => {             
            this.getOrders()
        },
        (e) => {
            console.error(e);
        }
    );
}


getStatus(order: Orders) {
    switch (order.status) {
      case 'Enviada':
        return 'warning';

      case 'Entregada':
        return 'success';

      default:
        return '';
    }
  };
}