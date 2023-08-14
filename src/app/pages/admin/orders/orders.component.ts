import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../models/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class OrdersComponent implements OnInit {
  Delete = 'Delete'
  supplierDialog: boolean = false;

  submitted: boolean = false;

  statuses!: any[];

  orders!: Orders[];

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

ngOnInit() {
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