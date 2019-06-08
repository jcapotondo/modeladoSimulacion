import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as math from 'mathjs';
import * as _ from 'lodash';
import {UIContext} from '../../ui.context';

@Component({
  selector: 'montecarlo',
  templateUrl: './montecarlo.component.html',
  styleUrls: ['./montecarlo.component.css']
})
export class MontecarloComponent implements OnInit {

  chart: Chart;
  dataset: any[];

  evolutionChart: Chart;
  evolutionDataset: any[];
  evolutionPointsX: any[];

  graphPoints = [];

  aLimit = 0;
  bLimit = 0;
  cLimit = 0;
  amountOfDots = 0;
  amountOfPoints = 0;

  totalPoints = 0;

  originalFunctionResult: number;
  calculatedFunctionResult: number;

  greenDots = [];
  redDots = [];

  userFunction: string;
  mathFunction: any;

  constructor(public uiContext: UIContext) { }

  ngOnInit() {
    this.uiContext.setTittle('Montecarlo');
  }

  execute() {
     // this.originalFunctionResult = this.calculateOriginalResult();

    this.reset();
    this.findGraphicPoints();
    this.drawGraph();
    this.drawEvolutionChart();

    this.calculateIntegralValue();
  }

  reset() {
    this.graphPoints = [];
    this.chart = new Chart('canvas', {type: 'line', data: {}});
    this.dataset = [];
    this.evolutionChart = new Chart('evolutionCanvas', {type: 'line', data: {}});
    this.evolutionDataset = [];
    this.evolutionPointsX = [];
    this.totalPoints = 0;
    this.cLimit = 0;
    this.greenDots = [];
    this.redDots = [];
  }

  calculateOriginalResult() {
    const f = this.parseFunction(this.userFunction);

    const asd = math.integral('x^2', 'x');
    console.log(math.integrate(asd, 0, 1));

    return 0;
  }

  findGraphicPoints() {
    this.mathFunction = this.parseFunction(this.userFunction);
    for (let i = 0; i <= this.amountOfPoints; i++) {
      const yValue = this.mathFunction.eval({x: i});
      this.graphPoints[i] = yValue;
    }
  }

  parseFunction(functionToParse: string) {
    return math.parse(functionToParse).compile();
  }

  drawGraph() {
    this.generateDataset();
    this.graphPoints.sort((a, b) => a - b);
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.graphPoints.map((value, index) => index),
        datasets: this.dataset
      },
      options: {
        legend: {
          display: false
        },
        ticks: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                precision: 1,
                stepSize: 1
              }
            }],
            xAxes: [{
              ticks: {
                beginAtZero: true,
                precision: 1,
                stepSize: 0.5,
                steps: this.graphPoints.length,
              }
            }],
          },
        },
      }
    });
  }

  generateDataset() {
    const mainDraw = {
      data: this.generateGraphPoints(),
      borderColor: '#0300ff',
      fill: false
    };
    this.dataset.push(mainDraw);
    this.dataset.push(this.calculateLimitA());
    this.dataset.push(this.calculateLimitB());
    this.dataset.push(this.calculateC());

    this.generateRandomDot();

    this.greenDots.forEach(dot => this.dataset.push(dot));
    this.redDots.forEach(dot => this.dataset.push(dot));
  }

  generateGraphPoints() {
    const points = [];
    this.graphPoints.forEach((value, index) =>  {
      points.push({
          x: index,
          y: value
      });
    });
    return points;
  }

  calculateLimitA() {
    return {
      label: 'a',
      data: [
        {x: this.aLimit, y: 0},
        {x: this.aLimit, y: this.mathFunction.eval({x: this.aLimit})}
      ],
      borderColor: '#00ccba',
      fill: false,
      borderDash: [5, 2],
      borderWidth: 2,
    };
  }

  calculateLimitB() {
    return {
      label: 'b',
      data: [
        {x: this.bLimit, y: 0},
        {x: this.bLimit, y: this.mathFunction.eval({x: this.bLimit})}
      ],
      borderColor: '#00ccba',
      fill: false,
      borderDash: [5, 2],
      borderWidth: 2,
    };
  }

  calculateC() {
    this.calculateLimitC();

    return {
      label: 'c',
      data: [
        {x: this.aLimit, y: this.cLimit},
        {x: this.bLimit, y: this.cLimit}
      ],
      borderColor: '#ff7700de',
      fill: false,
      borderDash: [5, 2],
      borderWidth: 2,
    };
  }

  calculateLimitC() {
    for (let i = this.aLimit; i <= this.bLimit; i++) {
      const valueAtPointI = this.mathFunction.eval({x: i});
      if (valueAtPointI > this.cLimit) {
        this.cLimit = valueAtPointI;
      }
    }
    this.cLimit = this.cLimit * 1.2;
  }

  generateRandomDot() {
    for (let i = 0; i <= this.amountOfDots - 1; i++) {
      const xRandom = _.random(this.aLimit, this.bLimit);
      const yRandom = _.random(0, this.cLimit);

      this.generateDot(xRandom, yRandom);

      this.totalPoints ++;
      this.generateEvolutionDataset(i);
    }
  }

  generateDot(x: number, y: number) {
    const graphValueAtX = this.graphPoints[x];

    (graphValueAtX < y) ? this.addRedDot(x, y) : this.addGreenDot(x, y);
  }

  addGreenDot(xValue: number, yValue: number) {
    this.greenDots.push({
      backgroundColor: '#19a000',
      borderColor: '#19a000',
      data: [{
        x: xValue,
        y: yValue,
        r: 5,
      }]
    });
  }

  addRedDot(xValue: number, yValue: number) {
    this.redDots.push( {
      backgroundColor: '#ff0000',
      borderColor: '#ff0000',
      data: [{
        x: xValue,
        y: yValue,
        r: 5,
      }]
    });
  }

  generateEvolutionDataset(amountOfValues) {
    this.calculateIntegralValue();

    const obj = {
      label: 'a',
      data: [
        {x: amountOfValues, y: this.calculatedFunctionResult},
      ],
      borderColor: '#00ccba',
      fill: false,
    };
    this.evolutionDataset.push(obj);
    this.evolutionPointsX.push(amountOfValues);
  }

  drawEvolutionChart() {
    this.evolutionChart = new Chart('evolutionCanvas', {
      type: 'line',
      data: {
        labels: this.evolutionPointsX,
        datasets: this.evolutionDataset
      },
      options: {
        legend: {
          display: false
        },
      }
    });
  }

  calculateIntegralValue() {
    const n = this.amountOfDots;
    const greenDots = this.greenDots.length;
    // console.log(this.cLimit);

    this.calculatedFunctionResult = (greenDots / n) * (this.bLimit - this.aLimit) * this.cLimit;
  }
}
