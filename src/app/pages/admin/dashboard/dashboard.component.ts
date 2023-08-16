import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }  

  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  } 

  basicData: any;

  basicOptions: any;

  data2: any;
  data3: any;
  data4: any;
  data5: any;

  options: any;

  ngOnInit() {
    if(localStorage.getItem('token') != null){
        console.log(localStorage.getItem('token'));
    }
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
              {
                  label: 'Sales',
                  data: [540, 325, 702, 620],
                  backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                  borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                  borderWidth: 1
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