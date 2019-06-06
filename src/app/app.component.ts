import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as math from 'mathjs';

Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chart: Chart;
  xPoints = [];
  yPoints = [];
  cLine = [];

  a = 0;
  b = 0;
  amountOfValues = 0;

  originalFunctionResult: number;
  calculatedFunctionResult: number;
  scope = {
    x: 4,
  };

  userFunction: string;

  constructor() { }

  ngOnInit() {
  }

  execute() {
    // this.originalFunctionResult = this.calculateOriginalResult();
    this.findGraphicPoints();

    this.drawGraph(this.xPoints, this.yPoints, this.cLine);
  }

  calculateOriginalResult() {
    const integrate = 'integrate(x^2, x, 0, 1)';
    const asss =  math.eval(integrate);

    return 0;
  }

  findGraphicPoints() {
    const mathFunction = this.parseFunction(this.userFunction);
    for (let i = 0; i <= this.amountOfValues; i++) {
      this.scope.x = i;
      this.xPoints.push(i);
      this.yPoints.push(mathFunction.eval(this.scope));
    }
  }

  parseFunction(functionToParse: string) {
    return math.parse(functionToParse).compile();
  }

  drawGraph(x: any[], y: any[], c: any[]) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            data: y,
            borderColor: '#0300ff',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 10
          }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              max: 10
          }
          }],
        }
      }
    });
    this.chart.Chart.clear();
  }
}
