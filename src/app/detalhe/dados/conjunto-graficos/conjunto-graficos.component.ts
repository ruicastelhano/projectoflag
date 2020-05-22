import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DadoAgrupamento} from '../../../shared/interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../../../shared/interfaces/extra-agrupamento';

@Component({
  selector: 'app-conjunto-graficos',
  templateUrl: './conjunto-graficos.component.html',
  styleUrls: ['./conjunto-graficos.component.css']
})
export class ConjuntoGraficosComponent implements OnInit, OnChanges{
  @Input() dadosAgrupamento: DadoAgrupamento[];
  @Input() extraAgrupamento: ExtraAgrupamento;
  private dadosGraficos: number[][];
  private labels: string[] = [];
  private titulos: string[];
  private legendaYAxis: string[];
  dadosF = [];

  constructor() { }

  ngOnInit(): void {
    this.transformData();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.transformData();
  }

  private transformData = (): void => {
    this.dadosGraficos = [];
    this.labels = [];
    this.titulos = [];
    this.legendaYAxis = [];
    this.dadosF = [];

    this.dadosGraficos = new Array(this.dadosAgrupamento[0].chart.length);
    for (let i = 0; i < this.dadosGraficos.length; i++) {
      this.dadosGraficos[i] = new Array(this.dadosAgrupamento.length);
    }

    this.dadosAgrupamento.forEach((tipo, i) => {
      this.labels.push(tipo.label);
      tipo.chart.forEach((n, j) => {
        this.dadosGraficos[j][i] = n;
      });
    });

    this.titulos = this.extraAgrupamento.titulos.slice(1);
    this.legendaYAxis = this.extraAgrupamento.legendaYAxis;

    this.titulos.forEach((value, index) => {
      this.dadosF.push({
        data: this.dadosGraficos[index],
        labels: this.labels,
        titulo: this.titulos[index],
        legendaYAxis: this.legendaYAxis[index]});
    });
  }

}
