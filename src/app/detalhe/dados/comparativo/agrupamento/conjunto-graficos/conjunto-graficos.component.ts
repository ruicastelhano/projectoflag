import {Component, Input, OnInit} from '@angular/core';
import {DadoAgrupamento} from '../../../../interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../../../../interfaces/extra-agrupamento';
import {DadosGraficos} from '../../../../interfaces/dados-graficos';

@Component({
  selector: 'app-conjunto-graficos',
  templateUrl: './conjunto-graficos.component.html',
  styleUrls: ['./conjunto-graficos.component.css']
})
export class ConjuntoGraficosComponent implements OnInit {
  @Input() dadosAgrupamento: DadoAgrupamento[];
  @Input() extraAgrupamento: ExtraAgrupamento;

  dadosGraficos: number[][];
  labels: string[] = [];
  titulos: string[];
  legendaYAxis: string[];
  dadosF = [];

  constructor() { }

  ngOnInit(): void {
    this.dadosGraficos = new Array(this.dadosAgrupamento[0].data.length);
    for (let i = 0; i < this.dadosGraficos.length; i++) {
      this.dadosGraficos[i] = new Array(this.dadosAgrupamento.length);
    }

    this.dadosAgrupamento.forEach((tipo, i) => {
      this.labels.push(tipo.label);
      tipo.data.forEach((n, j) => {
        this.dadosGraficos[j][i] = n;
      });
    });

    this.titulos = this.extraAgrupamento.titulos;
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
