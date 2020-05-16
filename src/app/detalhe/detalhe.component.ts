import {ActivatedRoute} from '@angular/router';
import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { ModelosAPIService } from './services/modelos-api.service';
import { Modelo } from './interfaces/modelo';
import {Dado} from './interfaces/dado';
import {DadosGeral} from './interfaces/dados-geral';
import {Circuito} from './interfaces/circuito';
import {GeoJSON} from './interfaces/geo-json';
import {Estado} from './interfaces/estado';
import {DadosService} from './services/dados.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, AfterViewInit {
  @Output() slugProduto: string;
  dados: DadosGeral;
  circuitos: Circuito[];
  estado: Estado;

  @ViewChild('toggleFiltroButton') toggleFiltroButton: ElementRef;
  showFiltro = true;
  texto = 'Esconder';

  constructor(private activatedRoute: ActivatedRoute,
              private dadosService: DadosService) { }


  ngAfterViewInit() {
    this.toggleFiltroButton.nativeElement.addEventListener('click', this.toggleShowFiltro);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.slugProduto = params.slug;
    });
    this.estado = {
      slugProduto: this.slugProduto,
      ano: null,
      mes: null,
      zona: null,
      turno: null,
      slugModelo: null,
    };
    this.getDadosData();
  }

  OnDataChanged = (data) => {
    this.estado = data;
    this.getDadosData();
  }

  getDadosData = () => {
    this.dadosService.getDataDados(
      this.estado.slugProduto,
      this.estado.slugModelo,
      this.estado.zona,
      this.estado.turno,
      this.estado.ano,
      this.estado.mes).subscribe((data: any) => {
      this.dados = data[0];
    });
  }

  toggleShowFiltro = () => {
    if (this.showFiltro) {
      this.showFiltro = false;
      this.texto = 'Mostrar';
    }
    else {
      this.showFiltro = true;
      this.texto = 'Esconder';
    }
  }
}


