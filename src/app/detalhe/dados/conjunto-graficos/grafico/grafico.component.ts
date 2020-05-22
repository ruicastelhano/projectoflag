import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, OnChanges{
  @Input() dados;
  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend = true;
  barChartPlugins: any[];
  barChartData: ChartDataSets[];
  barChartColors: Color[];

  constructor() {
    this.barChartOptions = {
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
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];
    this.barChartColors = [
      { backgroundColor: '#641E16' },
    ];
  }

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
