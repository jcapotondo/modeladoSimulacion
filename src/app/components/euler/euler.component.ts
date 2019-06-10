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

  eulerPoints: any[];
  eulerImprovedPoints: any[];

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

  addEulerPoint(t, x) { this.eulerPoints.push({t, x}); }

  eulerMethod() {
    this.addEulerPoint(this.aValue, this.x0Value);
    const a = this.aValue;
    const h = this.hValue;
    const n = this.nValue;
    const x0 = this.x0Value;
    this.addEulerPoint(a, x0);

    for ( let t = a + h, k = 0; t <= n * h + a; t += h, k ++ ) {
      const prev = this.eulerPoints[k];
      this.addEulerPoint(
        t,
        prev.x + (h * this.mathFunctionParser.eval(`f(${prev.t}, ${prev.x})`))
      );
    }
  }

  addEulerImprovedPoint(t, x) { this.eulerImprovedPoints.push({t, x}); }

  eulerImprovedMethod() {
    this.addEulerPoint(this.aValue, this.x0Value);
    const a = this.aValue;
    const h = this.hValue;
    const n = this.nValue;
    const x0 = this.x0Value;
    this.addEulerImprovedPoint(a, x0);

    for ( let t = a + h, k = a; t <= n * h + a; t += h, k ++ ) {
      const previousValue = this.eulerImprovedPoints[k];

      const predictor = previousValue.x + h * this.mathFunctionParser.eval(`f(${previousValue.t}, ${previousValue.x})`);
      const corrector =
        previousValue.x +
            h * 0.5 * (this.mathFunctionParser.eval(`f(${previousValue.t}, ${previousValue.x})`)) +
            this.mathFunctionParser.eval(`f(${t}, ${predictor})`);


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
    map.forEach((val) =>  {
      if (val.t <= this.bValue) {
        points.push({
          x: val.t,
          y: val.x
        });
      }
    });
    return points;
  }
}
