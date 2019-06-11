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

  addEulerPoint(t, x) { this.eulerPoints[t] = x; }

  eulerMethod() {
    this.addEulerPoint(this.aValue, this.x0Value);
    const a = this.aValue;
    const h = this.hValue;
    const n = this.nValue;
    for ( let t = a + h, k = a; t <= n * h + a; t += h, k += h ) {
        this.addEulerPoint(
          t,
          this.eulerPoints[k] + (h * this.mathFunctionParser.eval(`f(${k}, ${this.eulerPoints[k]})`))
        );
    }
  }

  addEulerImprovedPoint(t, x) { this.eulerImprovedPoints[t] = x; }

  eulerImprovedMethod() {
    this.addEulerPoint(this.aValue, this.x0Value);
    const a = this.aValue;
    const h = this.hValue;
    const n = this.nValue;

    for ( let t = a + h, k = a; t <= n * h + a; t += h, k += h) {
        const previousTvalue = k;
        const previousXvalue = this.eulerPoints[k];

        const predictor = previousXvalue + h * this.mathFunctionParser.eval(`f(${previousTvalue}, ${previousXvalue})`);
        const corrector =
              previousXvalue +
              h * 0.5 * (this.mathFunctionParser.eval(`f(${previousTvalue}, ${previousXvalue})`) +
              this.mathFunctionParser.eval(`f(${t}, ${predictor})`));


        this.addEulerImprovedPoint(
          t, 
          corrector
        );
    }
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
          }],
          yAxes: [ {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Eje x'
            },
          }]
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
      if(index <= this.bValue) {
        points.push({
          x: index,
          y: value
        });  
      }      
    });

    return points;
  }
}
