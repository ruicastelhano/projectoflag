import {ActivatedRoute} from '@angular/router';
import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { ModelosAPIService } from './services/modelos-api.service';
import { Modelo } from './interfaces/modelo';
import {Dado} from './interfaces/dado';
import {DadosGeral} from './interfaces/dados-geral';
import {Circuito} from './interfaces/circuito';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, AfterViewInit {
  @Output() slugProduto: string;
  dados: DadosGeral;
  circuitos: Circuito[];

  // Output para Filtro
  @Output() modelos: Modelo[] = [];
  @Output() zonas: number[] = [];
  @Output() turnos: number[] = [];
  @Output() geojsonObject: object;

  @ViewChild('toggleFiltroButton') toggleFiltroButton: ElementRef;
  showFiltro = true;
  texto = 'Esconder';

  constructor(private activatedRoute: ActivatedRoute,
              private modelosAPIService: ModelosAPIService) { }


  ngAfterViewInit() {
    this.toggleFiltroButton.nativeElement.addEventListener('click', this.toggleShowFiltro);
  }

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

  OnCircuitosChanged = (data) => {
    this.circuitos = data;
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


