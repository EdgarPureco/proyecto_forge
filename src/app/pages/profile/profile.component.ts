import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Customer } from 'src/app/models/customer';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProfileComponent implements OnInit {

  customerDialog: boolean = false;

  customer: Customer = {}

  submitted: boolean = false;


  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    // this.apiService.getCustomer().subscribe(
    //     (response) => { 

    //         this.customer = response;
    //     },
    //     (e) => {
    //         console.error(e);
    //     }
    // );
    this.customer.userId = ''
  }

  save() {
    this.submitted = true;
    if (this.customer.names?.trim()) {
      this.customer.userId = localStorage.getItem('id')!;
      this.apiService.updateCustomer(this.customer).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Datos Actualizado', life: 3000 })
        },
        (e) => {
          console.log(e);
          this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Datos No Actualizado', life: 3000 })
        }
      );

      this.customerDialog = false;
      this.customer = {};

    }
  }

  hideDialog() {
    this.customerDialog = false;
    this.submitted = false;
  }
  openNew() {
    this.customer = {};
    this.submitted = false;
    this.customerDialog = true;
  }
}
