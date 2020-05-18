import {Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {LeafletLayerDirective} from '@asymmetrik/ngx-leaflet';
import {GeoJSONPolygon} from '../../../shared/interfaces/geo-j-s-o-n-polygon';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() geojsonObject: GeoJSONPolygon;
  mapa;
  layer: any;

  constructor() { }

  ngOnInit(): void {}

  style = (feature): object => {
    return  feature.properties.turno === 1 ?
      {
        color: 'white',
        fillColor: 'tomato',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6,
      } :
      {
        color: 'white',
        fillColor: 'dodgerblue',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6,
      };
    }

  onEachFeature = (feature, layer): void => {
    L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'bg-light p-1',
        html: feature.properties.slug,
        iconSize: [50, 25],
      })
    }).addTo(this.mapa);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mapa) {
      this.layer = L.geoJSON(this.geojsonObject,
        {
          style: this.style,
          onEachFeature: this.onEachFeature,
        });
      this.layer.addTo(this.mapa);
      this.mapa.fitBounds(this.layer.getBounds());
    }
  }

  ngAfterViewInit(): void {
    this.initMapa();
  }

  private initMapa = (): void => {
    this.mapa = L.map('map').setView([38.7, -9.35], 12);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy;'
    });
    osm.addTo(this.mapa);

    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(this.mapa);
    googleHybrid.addTo(this.mapa);
  }

}
