import {Component, Input, OnInit, Output} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
  @Input() dados;

  public barChartOptions: ChartOptions = {
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
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];

  public barChartColors: Color[] = [
    { backgroundColor: '#e67e22' },
  ];

  constructor() { }

  ngOnInit() {
    this.barChartLabels = this.dados.labels;
    this.barChartData = [
      { data: this.dados.data, label: this.dados.titulo },
    ];
    this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = this.dados.legendaYAxis;
  }

}
