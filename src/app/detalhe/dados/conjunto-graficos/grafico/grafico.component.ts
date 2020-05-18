import {AfterViewChecked, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, OnChanges {
  @Input() dados;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          display: true,
        },
        scaleLabel: {
          display: true,
          labelString: null
        }
      }]
    }
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[];
  barChartColors: Color[] = [
    { backgroundColor: '#641E16' },
  ];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  private render = (): void => {
    this.barChartLabels = this.dados.labels;
    this.barChartData = [
      { data: this.dados.data, label: this.dados.titulo },
    ];
    this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = this.dados.legendaYAxis;
  }

}
