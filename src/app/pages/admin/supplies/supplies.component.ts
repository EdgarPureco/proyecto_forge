import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Supply } from 'src/app/models/supply';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-supplies',
    templateUrl: './supplies.component.html',
    styleUrls: ['./supplies.component.css'],
    providers: [MessageService, ConfirmationService]
})

export class SuppliesComponent implements OnInit {
    Delete = 'Delete'
    supplyDialog: boolean = false;

    supplies!: Supply[];

    supply!: Supply;

    submitted: boolean = false;

    statuses!: any[];

    buyDialog: boolean = false;

    quantity!: number;

    constructor(
        private apiService: ApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private sanitizer: DomSanitizer) { }

    ngOnInit() {
        this.apiService.getSupplies().subscribe(
            (response) => {

                this.supplies = response;
                this.supplies.forEach(element => {
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
        this.supply = {};
        this.submitted = false;
        this.supplyDialog = true;
    }


    editSupply(supply: Supply) {
        this.supply = { ...supply };
        this.supplyDialog = true;
    }

    deleteSupply(supply: Supply) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + supply.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.supplies = this.supplies.filter((val) => val.id !== supply.id);
                supply.id ?
                    this.apiService.deleteSupply(supply.id).subscribe(
                        () => this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supply Eliminado', life: 3000 }),
                        (e) => {
                            this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Supply No Eliminado', life: 3000 })
                        }
                    )
                    : this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Supply No Eliminado', life: 3000 })

                this.supply = {};
            }
        });
    }

    onUpload(event: UploadEvent) {
        for (let file of event.files) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    const base64Value = reader.result.toString().split(",")[1];
                    this.supply.image = base64Value
                }
            };
            reader.readAsDataURL(file);

        }

        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    hideDialog() {
        this.supplyDialog = false;
        this.submitted = false;
    }

    saveSupply() {
        this.submitted = true;
        if (this.supply.name?.trim()) {
            if (this.supply.id) {
                this.supplies[this.findIndexById(this.supply.id)] = this.supply;
                this.apiService.updateSupply(this.supply.id,this.supply).subscribe(
                    () => {
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supply Actualizado', life: 3000 })
                    },
                    (e) => {
                        console.log(e);
                        this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Supply No Actualizado', life: 3000 })
                    }
                );
            } else {

                this.apiService.insertSupply(this.supply).subscribe(
                    () => {
                        this.add()
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Supply Added', life: 3000 })
                    },
                    (e) => {
                        console.log(e);
                        this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Supply No Added', life: 3000 })
                    }
                );
            }

            this.supplies = [...this.supplies];
            this.supplyDialog = false;
            this.supply = {};

        }
    }

    add() {
        var tmp = this.supply
        tmp.image = this.toImage(tmp);
        this.supplies.push(tmp)
    }

    toImage(object: Supply){
        const base64String = object.image
        var url: SafeUrl;
        return url = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + base64String);
    }

    toBase64(){
        const base64Value = this.supply.image.toString().split(",")[1];
        this.supply.image = base64Value
    }
    
    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.supplies.length; i++) {
            if (this.supplies[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    openBuy(supply: Supply) {
        this.supply = { ...supply };
        this.quantity = 1;
        this.buyDialog = true;
    }

    buy(){
        this.apiService.buySupply(this.supply.id!, this.quantity).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Suministro Comprado', life: 3000 })
            },
            (e) => {
                console.log(e);
                this.messageService.add({ severity: 'error', summary: 'Error del servidor', detail: 'Suministro No Comprado', life: 3000 })
            }
        );
        this.buyDialog = false;
    }

    getSeverity(supply: Supply) {
        switch (supply.inventoryStatus) {
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
}