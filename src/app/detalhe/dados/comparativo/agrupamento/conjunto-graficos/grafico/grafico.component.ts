import {Component, Input, OnInit, Output} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {ExtraAgrupamento} from '../../../../../interfaces/extra-agrupamento';
import {DadoAgrupamento} from '../../../../../interfaces/dado-agrupamento';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  chartOptions = {
    responsive: true
  };
  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];
  chartLabels = ['January', 'February', 'Mars', 'April'];


  constructor() {
  }

  ngOnInit(): void {
  }

}
