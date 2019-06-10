import { Component, OnInit } from '@angular/core';
import {UIContext} from '../../ui.context';
import { Chart } from 'chart.js';
import * as math from 'mathjs';

@Component({
  selector: 'euler',
  templateUrl: './euler.component.html',
  styleUrls: ['./euler.component.css']
})
export class EulerComponent implements OnInit {
  eulerChart: Chart;

  eulerPoints: number[];
  eulerImprovedPoints: number[];

  userFunction: string;
  mathFunctionParser: any;

  nValue = 0;
  aValue: number;
  bValue: number;
  hValue: number;
  x0Value: number;

  constructor(public uiContext: UIContext) { }

  ngOnInit() {
    this.uiContext.setTittle('Metodo de Euler & Euler Mejorado');
  }

  execute() {
    this.reset();
    this.parseFunction();
    this.findGraphicPoints();
    this.drawEulerGraph();
  }

  reset() {
    this.eulerChart = new Chart('eulerCanvas', {type: 'line', data: {}});
    this.eulerPoints = [];
    this.eulerImprovedPoints = [];
  }

  parseFunction() {
    const parser = math.parser();
    parser.eval(`f(t, x) = ${this.userFunction}` );
    this.mathFunctionParser = parser;
  }

  findGraphicPoints() {
    this.eulerMethod();
    this.eulerImprovedMethod();
  }

  eulerMethod() {
    let x = this.x0Value;
    for (let t = this.aValue; t <= this.nValue; t += this.hValue) {
      this.eulerPoints[t] = x;
      x += this.mathFunctionParser.eval( `f(${t}, ${x})` ) * this.hValue;
    }
  }

  eulerImprovedMethod() {
  }

  drawEulerGraph() {
    this.eulerChart = new Chart('eulerCanvas', {
      type: 'line',
      data: {
        labels: this.eulerPoints.map((value, index) => index),
        datasets: this.generateDataset()
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [ {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Eje t'
            },
          } ],
          yAxes: [ {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Eje x'
            }
          } ]
        }
      }
    });
  }

  generateDataset() {
    return [
      this.linePoints(this.eulerPoints, '#0300ff', 'Euler'),
      this.linePoints(this.eulerImprovedPoints, '#990003', 'Euler Mejorado'),
    ];
  }

  linePoints(map, borderColor, label) {
    return {
      data: this.generateGraphPoints(map),
      borderColor,
      label,
      fill: false,
    };
  }

  generateGraphPoints(map) {
    const points = [];
    map.forEach((value, index) =>  {
      points.push({
        x: index,
        y: value
      });
    });
    return points;
  }
}
