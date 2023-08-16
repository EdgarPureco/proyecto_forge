import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private apiService: ApiService,
    private router: Router, private authService: AuthService) { }  

  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 

  suppliesInventory: any;
  productsInventory: any;

  suppInv!: any[]
  productInv!: any[]

  basicOptions: any;

  data2: any;
  data3: any;
  data4: any;
  data5: any;

  aux1!: any[]
  aux2!: any[]
  

  options: any;

  ngOnInit() {

    this.apiService.getCustomersummary().subscribe(
        (response) => { 
            
            console.log(response);
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getSupplysummary().subscribe(
        (response) => { 
            
            console.log(response);
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getMonthlyproductsolds().subscribe(
        (response) => { 
            
            console.log(response);
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getProductssold().subscribe(
        (response) => { 
            
            console.log(response);
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getProductinventory().subscribe(
        (response) => { 
            var tmp: any[] = response
            var names: any[]=[]
            var quantities: any[]=[]

            tmp.forEach((item)=>{
                names.push(item['name'])
            })
            tmp.forEach((item)=>{
                quantities.push(item['availableQuantity'])
            })
            this.productInv=[]
            this.productInv.push(names)
            this.productInv.push(quantities)

            this.productsInventory = {
                labels: this.productInv[0],
                datasets: [
                    {
                        label: 'Cantidad disponible',
                        data: this.productInv[1],
                        borderWidth: 3
                    }
                ]
            };
      
            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getProductsummary().subscribe(
        (response) => { 
            
            console.log(response);
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getStatistics().subscribe(
        (response) => { 
            
            console.log('Stats',response);
            
        },
        (e) => {
            console.error(e);
        }
    );
    this.apiService.getSuplyinventory().subscribe(
        (response) => { 
            var tmp: any[] = response
            var names: any[]=[]
            var quantities: any[]=[]

            tmp.forEach((item)=>{
                names.push(item['name'])
            })
            tmp.forEach((item)=>{
                quantities.push(item['availableUseQuantity'])
            })
            this.suppInv=[]
            this.suppInv.push(names)
            this.suppInv.push(quantities)

            this.suppliesInventory = {
                labels: this.suppInv[0],
                datasets: [
                    {
                        label: 'Cantidad disponible',
                        data: this.suppInv[1],
                        borderWidth: 3
                    }
                ]
            };
      
            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
            
        },
        (e) => {
            console.error(e);
        }
    );


      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

     

      this.data3 = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Profit',
                backgroundColor: documentStyle.getPropertyValue('--green-700'),
                borderColor: documentStyle.getPropertyValue('--green-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'Expenses',
                backgroundColor: documentStyle.getPropertyValue('--red-600'),
                borderColor: documentStyle.getPropertyValue('--red-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
      
    this.data2 = {
        labels: ['Marcos de Puerta', 'Marcos de Ventana', 'Pots',],
        datasets: [
            {
                label: 'Made',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, ]
            },
            {
                label: 'To make',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: [28, 48, 40, ]
            }
        ]
    };
    
    this.data4 = {
        labels: ['Marcos de Puerta', 'Marcos de Ventana', 'Pots', 'item1', 'item2', 'item3'],
        datasets: [
            {
                label: 'Best',
                backgroundColor: documentStyle.getPropertyValue('--green-700'),
                borderColor: documentStyle.getPropertyValue('--green-500'),
                data: [10, 40, 60, 20, 80, 50, ]
            }
        ]
    };
    
    this.data5 = {
        labels: ['Marcos de Puerta', 'Marcos de Ventana', 'Pots', 'item1', 'item2', 'item3'],
        datasets: [
            {
                label: 'Worst',
                backgroundColor: documentStyle.getPropertyValue('--red-600'),
                borderColor: documentStyle.getPropertyValue('--red-400'),
                data: [2, 8, 5, 1, 4, 6]
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }

        }
    };
  }
}