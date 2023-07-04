import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {Chart, ChartItem, registerables} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import {CandleHour} from "../model/model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  private chart: any = null;
  private candleHourList: CandleHour[];

  constructor(private elementRef: ElementRef, @Inject(MAT_DIALOG_DATA) data: CandleHour[]) {
    Chart.register(...registerables);
    Chart.register(zoomPlugin);
    this.candleHourList = data;
  }

  ngOnInit(): void {
    this.createChart4h(this.candleHourList);
  }

  createChart4h(candles: CandleHour[]) {

    let labels = candles.map(candle => candle.date);


    let ctx = this.elementRef.nativeElement.querySelector(`#my-chart`) as ChartItem;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'shadow',
            data: labels.map((value, index) => {
              return [candles[index].realHigh, candles[index].realLow]
            }),
            borderWidth: 1,
            order: 1,
            borderSkipped: false,
          }
          ,
          {
            label: 'body',
            data: labels.map((value, index) => {
              return [candles[index].realOpen, candles[index].realClose];
            }),
            backgroundColor: labels.map((value, index) => {
              let open = candles[index].realOpen;
              let close = candles[index].realClose;
              let color = open - close;
              return (color > 0 ? 'red' : 'green');
            }),
            order: 2
          }
          ,
          {
            label: 'phd',
            data: labels.map((value, index) => [index, (candles[index].preHighDay === 0 ? null : candles[index].preHighDay)]),
            borderColor: '#0233e3',
            backgroundColor: '#0233e3',
            type: 'line',
            order: 0,
            spanGaps: true,
            pointRadius: 1,
          }
          ,
          {
            label: 'pcd',
            data: labels.map((value, index) => [index, (candles[index].preCloseDay === 0 ? null : candles[index].preCloseDay)]),
            borderColor: '#f88305',
            backgroundColor: '#f88305',
            type: 'line',
            order: 0,
            spanGaps: true,
            pointRadius: 1,
          }
          ,
          {
            label: 'pld',
            data: labels.map((value, index) => [index, (candles[index].preLowDay === 0 ? null : candles[index].preLowDay)]),
            borderColor: '#6205f8',
            backgroundColor: '#6205f8',
            type: 'line',
            order: 0,
            spanGaps: true,
            pointRadius: 1,
          }
          ,
          {
            label: 'phw',
            data: labels.map((value, index) => [index, (candles[index].preHighWeek === 0 ? null : candles[index].preHighWeek)]),
            borderColor: '#0233e3',
            backgroundColor: '#0233e3',
            type: 'line',
            order: 0,
            spanGaps: true,
            pointRadius: 0.4,
            borderWidth: 6
          }
          ,
          {
            label: 'pcw',
            data: labels.map((value, index) => [index, (candles[index].preCloseWeek === 0 ? null : candles[index].preCloseWeek)]),
            borderColor: '#f88305',
            backgroundColor: '#f88305',
            type: 'line',
            order: 0,
            spanGaps: true,
            pointRadius: 0.4,
            borderWidth: 6
          }
          ,
          {
            label: 'plw',
            data: labels.map((value, index) => [index, (candles[index].preLowWeek === 0 ? null : candles[index].preLowWeek)]),
            borderColor: '#6205f8',
            backgroundColor: '#6205f8',
            type: 'line',
            order: 0,
            spanGaps: true,
            pointRadius: 0.4,
            borderWidth: 6
          }
          ,
          {
            label: 'ph-hour',
            data: labels.map((value, index) => [index, candles[index].preHigh]),
            borderColor: '#0fe2f5',
            backgroundColor: '#0fe2f5',
            type: 'scatter',
            order: 0,
            hidden: true,
          }
          ,
          {
            label: 'pc-hour',
            data: labels.map((value, index) => [index, candles[index].preClose]),
            borderColor: '#ebedee',
            backgroundColor: '#e9ecec',
            type: 'scatter',
            order: 0,
            hidden: true,
          }
          ,
          {
            label: 'pl-hour',
            data: labels.map((value, index) => [index, candles[index].preLow]),
            borderColor: '#67f50f',
            backgroundColor: '#67f50f',
            type: 'scatter',
            order: 0,
            hidden: true,
          }
        ],
      },
      options: {
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: false,
            beginAtZero: false
          }
          ,
          y2: {
            display: true,
            position: 'right',
            beginAtZero: false,
          }
          ,
          y1: {
            type: 'linear',
            display: false,
            position: 'right',
            beginAtZero: false,
            min: -2,
            max: 3,
            ticks: {
              // forces step size to be 50 units
              stepSize: 1
            }
            ,
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
        interaction: {
          intersect: false
        },
      }
    });

  }
}
