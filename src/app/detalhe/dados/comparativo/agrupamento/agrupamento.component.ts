import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Dado} from '../../../interfaces/dado';
import {DadoAgrupamento} from '../../../interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../../../interfaces/extra-agrupamento';

@Component({
  selector: 'app-agrupamento',
  templateUrl: './agrupamento.component.html',
  styleUrls: ['./agrupamento.component.css']
})
export class AgrupamentoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dadosAgrupamento: DadoAgrupamento[];
  @Input() extrasAgrupamento: ExtraAgrupamento;
  @Output() chartLabels = [];
  @Output() chartData = [];

  constructor() {
  }

  ngOnInit(): void {
    // this.prepareChartData();
    console.log(this.extrasAgrupamento);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dadosAgrupamento);
    console.log(this.extrasAgrupamento);
  }

  prepareChartData = () => {
    this.dadosAgrupamento.forEach((foo) => {
      this.chartData.push(foo.data[3]);
    });
    this.dadosAgrupamento.forEach((foo) => {
      this.chartLabels.push(foo.label);
    });
  }

  ngAfterViewInit(): void {

    console.log(this.extrasAgrupamento);
  }

}
