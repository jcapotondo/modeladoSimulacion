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


  eulerImprovedChart: Chart;
  eulerChart: Chart;

  eulerPoints: number[];
  eulerImprovedPoints: number[];

  amountOfPoints = 0;
  userFunction: string;
  mathFunction: any;


  constructor(public uiContext: UIContext) { }

  ngOnInit() {
    this.uiContext.setTittle('Euler & Euler Mejorado');
  }

  execute() {
    this.reset();
    this.findGraphicPoints();
    this.drawEulerGraph();
    this.drawEulerImprovedGraph();
  }

  reset() {
    this.eulerImprovedChart = new Chart('eulerCanvas', {type: 'line', data: {}});
    this.eulerChart = new Chart('eulerImprovedCanvas', {type: 'line', data: {}});
    this.eulerPoints = [];
    this.eulerImprovedPoints = [];
  }


  findGraphicPoints() {
    this.mathFunction = this.parseFunction(this.userFunction);
    for (let i = 0; i <= this.amountOfPoints; i++) {
      const yValue = this.mathFunction.eval({x: i});

      this.eulerPoints[i] = yValue;
      this.eulerImprovedPoints[i] = yValue;
    }
  }

  parseFunction(functionToParse: string) {
    return math.parse(functionToParse).compile();
  }

  drawEulerGraph() {
    this.eulerChart = new Chart('eulerCanvas', {
      type: 'line',
      data: {
        labels: this.eulerPoints.map((value, index) => index),
        datasets: this.generateDataset(this.eulerPoints)
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  drawEulerImprovedGraph() {
    this.eulerChart = new Chart('eulerImprovedCanvas', {
      type: 'line',
      data: {
        labels: this.eulerImprovedPoints.map((value, index) => index),
        datasets: this.generateDataset(this.eulerImprovedPoints)
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  generateDataset(map) {
    const dataset = [];
    const mainDraw = {
      data: this.generateGraphPoints(map),
      borderColor: '#0300ff',
      fill: false
    };
    dataset.push(mainDraw);
    return dataset;
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
