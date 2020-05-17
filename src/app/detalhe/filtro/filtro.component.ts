import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modelo} from '../interfaces/modelo';
import {Dado} from '../interfaces/dado';
import {Circuito} from '../interfaces/circuito';
import {GeoJSON} from '../interfaces/geo-json';
import {DadosService} from '../services/dados.service';
import {Estado} from '../interfaces/estado';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  @Input() slugProduto: string;
  geojsonObject: GeoJSON;
  modelos: Modelo[] = [];
  zonas: number[];
  turnos: number[];
  estado: Estado;
  error = null;

  @Output() dataChanged = new EventEmitter<Estado>();

  constructor(private dadosService: DadosService) { }

  ngOnInit(): void {
    this.dadosService.getDataModelos(this.slugProduto)
      .subscribe((data: any) => {
        this.geojsonObject = data;
        data.features.forEach(modelo => {
          this.modelos.push({slug: modelo.properties.slug, produto: modelo.properties.produto, turno: modelo.properties.turno,
            zona: modelo.properties.zona});
        });
        this.zonas = Array.from(new Set(this.modelos.map(modelo => modelo.zona)));
        this.turnos = Array.from(new Set(this.modelos.map(modelo => modelo.turno)));
      },
        error => {
          this.error = error.message;
        });
  }

  OnDataChanged = (data) => {
    this.estado = data;
    this.dataChanged.emit(data);
  }

}
