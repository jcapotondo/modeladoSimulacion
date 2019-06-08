import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as math from 'mathjs';
import * as _ from 'lodash';

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

  xPoints = [];
  yPoints = [];
  cLine = [];

  lineValuesMap = [];

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

  constructor() { }

  ngOnInit() {
  }

  execute() {
     //this.originalFunctionResult = this.calculateOriginalResult();

    this.reset();
    this.findGraphicPoints();
    this.drawGraph();
    this.drawEvolutionChart();

    this.calculateIntegralValue();
  }

  reset() {
    this.chart = new Chart('canvas', {type: 'line',data:{}});
    this.dataset = [];
    this.xPoints = [];
    this.yPoints = [];
    this.evolutionChart = new Chart('evolutionCanvas', {type: 'line',data:{}})
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
      var yValue = this.mathFunction.eval({x: i});

      this.xPoints.push(i);
      this.yPoints.push(yValue);
      this.lineValuesMap[i] = yValue;
    }
  }

  parseFunction(functionToParse: string) {
    return math.parse(functionToParse).compile();
  }

  drawGraph() {
    this.generateDataset();

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.xPoints,
        datasets: this.dataset
      },
      options: {
        legend: {
          display: false
        },
      }
    });
  }

  generateDataset() {
    var mainDraw = {
      data: this.yPoints,
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

  calculateLimitA() {
    return {
      label: 'a',
      data: [
        {x: this.aLimit, y: 0},
        {x: this.aLimit, y: this.mathFunction.eval({x:this.aLimit})}
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
        {x: this.bLimit, y: this.mathFunction.eval({x:this.bLimit})}
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

  calculateLimitC(){
    for (let i = this.aLimit; i <= this.bLimit; i++) {
      var valueAtPointI = this.mathFunction.eval({x: i});
      if(valueAtPointI > this.cLimit){
        this.cLimit = valueAtPointI;
      }
    }
    this.cLimit = this.cLimit * 1.2;
  }

  generateRandomDot() {
    for (let i = 0; i <= this.amountOfDots -1; i++) {
      var xRandom = _.random(this.aLimit, this.bLimit);
      var yRandom = _.random(0, this.cLimit);

      var yValueAtX = this.lineValuesMap[xRandom];

      (yValueAtX < yRandom) ? this.addRedDot(xRandom, yRandom) : this.addGreenDot(xRandom, yRandom);

      this.totalPoints ++;
      this.generateEvolutionDataset(i);
    }
  }

  addGreenDot(xValue: any, yValue: any) {
    this.greenDots.push({
      backgroundColor: "#19a000",
      borderColor: "#19a000",
      data: [{
        x: xValue,
        y: yValue,
        r: 5,
      }]
    });
  }

  addRedDot(xValue: any, yValue:any) {
    this.redDots.push( {
      backgroundColor: "#ff0000",
      borderColor: "#ff0000",
      data: [{
        x: xValue,
        y: yValue,
        r: 5,
      }]
    });
  }

  generateEvolutionDataset(amountOfValues) {
    this.calculateIntegralValue();
    
    var obj = {
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

  calculateIntegralValue(){
    var n = this.amountOfDots;
    var greenDots = this.greenDots.length;
    console.log(this.cLimit)

    this.calculatedFunctionResult = (greenDots/n) * (this.bLimit - this.aLimit) * this.cLimit;
  }
}
