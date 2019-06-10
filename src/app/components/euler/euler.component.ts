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
  mathFunction: any;

  nValue = 0;
  aValue: number;
  bValue: number;
  hValue: number;

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
    console.log("User function -> " + this.userFunction)
    const parser = math.parser();
    console.log(parser)
    this.mathFunction = parser.eval(`f(x, t) = ${this.userFunction}` );
  }

  findGraphicPoints() {
    this.eulerMethod();
    this.eulerImprovedMethod();
  }

  eulerMethod() {
    let x = 0;

    for (let t = 0 + this.hValue, k = 0; t <= this.nValue; t += this.hValue, k ++) {
      this.eulerPoints[t] = x;

      const number = this.mathFunction.eval( `f(${x}, ${t})` );
      console.log(number)


      x += this.mathFunction.eval( {x, t} ) * this.hValue;
    }

    console.log(this.eulerPoints)
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
