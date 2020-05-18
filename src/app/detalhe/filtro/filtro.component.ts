import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Modelo} from '../../shared/interfaces/modelo';
import {Dado} from '../../shared/interfaces/dado';
import {Circuito} from '../../shared/interfaces/circuito';
import {GeoJSONPolygon} from '../../shared/interfaces/geo-j-s-o-n-polygon';
import {DadosService} from '../../shared/services/dados.service';
import {Estado} from '../../shared/interfaces/estado';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  @Input() slugProduto: string;
  @Output() dataChanged = new EventEmitter<Estado>();
  geojsonObject: GeoJSONPolygon;
  modelos: Modelo[] = [];
  zonas: number[];
  turnos: number[];
  estado: Estado;
  error = null;

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

  OnDataChanged = (data): void => {
    this.estado = data;
    this.dataChanged.emit(data);
  }

}
