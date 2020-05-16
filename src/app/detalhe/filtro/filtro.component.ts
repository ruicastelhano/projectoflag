import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modelo} from '../interfaces/modelo';
import {Dado} from '../interfaces/dado';
import {Circuito} from '../interfaces/circuito';
import {GeoJSON} from '../interfaces/geo-json';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  @Input() slugProduto: string;
  @Input() modelos: Modelo[];
  @Input() zonas: number[];
  @Input() turnos: number[];
  @Input() geojsonObject: GeoJSON;

  @Output() dataChanged = new EventEmitter<Dado>();
  @Output() circuitosChanged = new EventEmitter<Circuito[]>();

  dados: Dado;
  circuitos: Circuito[];

  constructor() { }

  ngOnInit(): void {
  }

  OnDataChanged = (data) => {
    this.dados = data;
    this.dataChanged.emit(data);
  }

  OnCircuitosChanged = (data) => {
    this.circuitos = data;
    this.circuitosChanged.emit(data);
  }

}
