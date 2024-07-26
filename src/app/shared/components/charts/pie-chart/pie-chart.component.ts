import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {

  protected chart: Chart | undefined;


  ngOnInit(): void {
    this.createChart();
    // this.obtenerDatos();
  }


  createChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    // Datos ejemplo
    const activos_moviles = ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D', 'Categoría E'];
    const datos = [30, 20, 25, 15, 10];

    const backgroundColors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)'
    ];

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: activos_moviles,
        datasets: [{
          label: 'Total',
          data: datos,
          backgroundColor: backgroundColors,
          borderColor: '#fff',
          borderWidth: 2,
        }]
        
      },
      options: {
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000 // duración en milisegundos
        },
        responsive: true,
      } as ChartOptions
    });
  }
}
