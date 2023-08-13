import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent {

  Delete = 'Delete'
  userDialog: boolean = false;

  users!: User[];

  user!: User;

  selectedUsers!: User[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
      private apiService: ApiService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
      ) { }

  ngOnInit() {
      this.apiService.getUsers().subscribe(
        (response) => { 
            this.users = response;
        },
          (e) => {
              console.error(e);
          }
      );
  }

  openNew() {
      this.user = {};
      this.submitted = false;
      this.userDialog = true;
  }


  editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
      
  }

  deleteUser(user: User) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + user.email + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.users = this.users.filter((val) => val.id !== user.id);
              user.id ?
                  this.apiService.deleteUser(user.id).subscribe(
                      () => this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 }),
                      (e) => {
                          this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'User Not Deleted', life: 3000 })
                      }
                  )
                  : this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User Not Deleted', life: 3000 })

              this.user = {};
          }
      });
  }


  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  saveUser() {
      this.submitted = true;
      if (this.user.email?.trim()) {
          if (this.user.id) {
            this.setRole(this.user.roleId!);
              this.users[this.findIndexById(this.user.id)] = this.user;
              this.apiService.updateUser(this.user.id, this.user).subscribe(
                  () => {
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 })
                  },
                  (e) => {
                      console.log(e);
                      this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'User Not Updated', life: 3000 })
                  }
              );
          } else {
              this.add()
              this.apiService.insertUser(this.user).subscribe(
                  () => {
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Added', life: 3000 })
                  },
                  (e) => {
                      console.log(e);
                      this.messageService.add({ severity: 'error', summary: 'Error from server', detail: 'User Not Added', life: 3000 })
                  }
              );
          }

          this.users = [...this.users];
          this.userDialog = false;
          this.user = {};

      }
  }

  add(){
      this.users.push(this.user)
  }

  setRole(roleId: string){
    switch (roleId) {
        case '1':
            this.user.role = 'admin'
            break;
        case '2':
            this.user.role = 'seller'
            break;
        case '3':
            this.user.role = 'stocker'
            break;
    }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }


}