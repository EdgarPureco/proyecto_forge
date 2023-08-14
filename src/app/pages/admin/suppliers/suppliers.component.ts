import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Supplier } from 'src/app/models/supplier';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-Suppliers',
  templateUrl: './Suppliers.component.html',
  styleUrls: ['./Suppliers.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class SuppliersComponent implements OnInit {
  Delete = 'Delete'
  supplierDialog: boolean = false;

  suppliers!: Supplier[];

  supplier!: Supplier;

  selectedSuppliers!: Supplier[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
      private apiService: ApiService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService) { }

  ngOnInit() {
      this.apiService.getSuppliers().subscribe(
          (response) => { 
              
              this.suppliers = response;
              
          },
          (e) => {
              console.error(e);
          }
      );
  }

  openNew() {
      this.supplier = {};
      this.submitted = false;
      this.supplierDialog = true;
  }


  editSupplier(supplier: Supplier) {
      this.supplier = { ...supplier };
      this.supplierDialog = true;
  }

  deleteSupplier(supplier: Supplier) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + supplier.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.suppliers = this.suppliers.filter((val) => val.id !== supplier.id);
              supplier.id ?
                  this.apiService.deleteSupplier(supplier.id).subscribe(
                      () => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supplier Eliminado', life: 3000 }),
                      (e) => {
                          this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'Supplier Not Eliminado', life: 3000 })
                      }
                  )
                  : this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Supplier Not Eliminado', life: 3000 })

              this.supplier = {};
          }
      });
  }


  hideDialog() {
      this.supplierDialog = false;
      this.submitted = false;
  }

  saveSupplier() {
      this.submitted = true;
      if (this.supplier.name?.trim()) {
          if (this.supplier.id) {
              this.suppliers[this.findIndexById(this.supplier.id)] = this.supplier;
              this.apiService.updateSupplier(this.supplier.id, this.supplier).subscribe(
                  () => {
                      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supplier Updated', life: 3000 })
                  },
                  (e) => {
                      console.log(e);
                      this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'Supplier Not Updated', life: 3000 })
                  }
              );
          } else {
              this.add()
              this.apiService.insertSupplier(this.supplier).subscribe(
                  () => {
                      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supplier Added', life: 3000 })
                  },
                  (e) => {
                      console.log(e);
                      this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'Supplier Not Added', life: 3000 })
                  }
              );
          }

          this.suppliers = [...this.suppliers];
          this.supplierDialog = false;
          this.supplier = {};

      }
  }

  add(){
      this.suppliers.push(this.supplier)
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.suppliers.length; i++) {
          if (this.suppliers[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  getStatus(supplier: Supplier) {
    switch (supplier.status) {
      case 'Activo':
        return 'succes';

      default:
        return 'danger';
    }
  };

}