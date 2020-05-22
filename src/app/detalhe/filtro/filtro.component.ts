import {Component, Input, OnInit} from '@angular/core';
import {Modelo} from '../../shared/interfaces/modelo';
import {GeoJSONPolygon} from '../../shared/interfaces/geo-j-s-o-n-polygon';
import {DadosService} from '../../shared/services/dados.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  @Input() slugProduto: string;
  geojsonObject: GeoJSONPolygon;
  modelos: Modelo[] = [];
  zonas: number[];
  turnos: number[];
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

}
