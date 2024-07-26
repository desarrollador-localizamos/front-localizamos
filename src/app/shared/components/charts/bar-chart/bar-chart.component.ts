import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {

  private chart: Chart | undefined;

  ngOnInit(): void {
    this.createChart();
    // this.obtenerDatosVehiculos();
  }

  createChart(){
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    // Datos ejemplo
    const labels = ['XXX-XX', 'YYY-YY', 'ZZZ-ZZ', 'AAA-AA', 'BBB-BB'];
    const data1 = [3, 4, 6, 8, 9];
    const labeldatasets = 'Example';
    const yAxisLabel = 'Example';
    const xAxisLabel = 'Example';

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: labeldatasets,
            data: data1,
            backgroundColor: 'rgba(0, 51, 204, 0.8)',
            borderColor: 'rgba(0, 51, 204, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: yAxisLabel, // Etiqueta para el eje y
            },
          },
          x: {
            title: {
              display: true,
              text: xAxisLabel, // Etiqueta para el eje x
            },
          },
        },
        animation: {
          duration: 2000,
          easing: 'linear',
        },
        plugins: {
          tooltip: {
            enabled: true,
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: Math.round,
            font: {
              weight: 'bold',
            },
          },
        },
      } as ChartOptions,
    });
  }
}
