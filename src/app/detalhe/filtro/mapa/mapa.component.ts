import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {GeoJSONPolygon} from '../../../shared/interfaces/geo-j-s-o-n-polygon';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {
  @Input() geojsonObject: GeoJSONPolygon;
  private mapa;
  private layer: any;
  private legend: any;

  ngOnInit(): void {}

  onEachFeature = (feature, layer): void => {
    L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'bg-light p-1 text-center map-marker',
        html: feature.properties.slug,
        iconSize: [feature.properties.slug.length * 7, 25],
      })
    }).addTo(this.mapa);
  }

  ngAfterViewInit(): void {
    this.initMapa();

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

    /*const legend = new (L.Control.extend({
      options: { position: 'bottomright' }
    }));*/

/*    const legend = new L.Control({position: 'bottomleft'});

    legend.onAdd = (map) => {
      let div = L.DomUtil.create('div', 'legend');
      div.innerHTML += '<h4>Turno</h4>';
      div.innerHTML += '<i style="background: tomato"></i><span>Manhã</span><br>';
      div.innerHTML += '<i style="background: yellowgreen"></i><span>Tarde</span><br>';
      div.innerHTML += '<i style="background: dodgerblue"></i><span>Noite</span><br>';
    };
    legend.addTo(this.mapa);*/
  }

  private style = (feature): object => {
    let fillColor;
    switch (feature.properties.turno) {
      case 1:
        fillColor = 'tomato';
        break;
      case 2:
        fillColor = 'yellowgreen';
        break;
      case 3:
        fillColor = 'dodgerblue';
        break;
      default:
        fillColor = 'black';
    }
    return {
      color: 'white',
      fillColor,
      weight: 1,
      opacity: 1,
      fillOpacity: 0.6,
    };
  }

}
