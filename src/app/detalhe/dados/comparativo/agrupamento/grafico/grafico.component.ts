import {Component, Input, OnInit, Output} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {ExtraAgrupamento} from '../../../../interfaces/extra-agrupamento';
import {DadoAgrupamento} from '../../../../interfaces/dado-agrupamento';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  @Input() chartLabels: string[];
  @Input() chartData: number[];


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.chartData, label: 'Best Fruits' }
  ];


  constructor() {
  }

  ngOnInit(): void {
    console.log(this.chartData);
  }

}
