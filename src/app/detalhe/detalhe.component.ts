import {ActivatedRoute} from '@angular/router';
import {Component, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ModelosAPIService } from './services/modelos-api.service';
import { Modelo } from './interfaces/modelo';
import {Dado} from './interfaces/dado';
import {DadosGeral} from './interfaces/dados-geral';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  @Output() slugProduto: string;
  dados: DadosGeral;

  // Output para Filtro
  @Output() modelos: Modelo[] = [];
  @Output() zonas: number[] = [];
  @Output() turnos: number[] = [];
  @Output() geojsonObject: object;

  constructor(private activatedRoute: ActivatedRoute,
              private modelosAPIService: ModelosAPIService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.slugProduto = params.slug;
    });
    this.getData();
  }

  getData(){
    this.modelosAPIService.getData(this.slugProduto).subscribe((data: any) => {
      this.geojsonObject = data;
      data.features.forEach(modelo => {
        this.modelos.push({slug: modelo.properties.slug, produto: modelo.properties.produto, turno: modelo.properties.turno,
          zona: modelo.properties.zona});
      });
      this.zonas = Array.from(new Set(this.modelos.map(modelo => modelo.zona)));
      this.turnos = Array.from(new Set(this.modelos.map(modelo => modelo.turno)));
    });
  }

  OnDataChanged = (data) => {
    this.dados = data;
  }
}


