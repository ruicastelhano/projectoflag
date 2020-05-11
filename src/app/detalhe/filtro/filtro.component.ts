import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modelo} from '../interfaces/modelo';
import {Dado} from '../interfaces/dado';

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
  @Input() geojsonObject: object;

  @Output() dataChanged = new EventEmitter<Dado>();

  dados: Dado;

  constructor() { }

  ngOnInit(): void {
  }

  OnDataChanged = (data) => {
    this.dados = data;
    this.dataChanged.emit(data);
  }

}
