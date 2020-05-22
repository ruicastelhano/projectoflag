import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GeoJSONPolygon} from '../../../shared/interfaces/geo-j-s-o-n-polygon';
import * as L from 'leaflet';
import {circle, latLng, Layer, polygon, tileLayer} from 'leaflet';
import {EstadoService} from '../../../shared/services/estado.service';
import {takeUntil, tap} from 'rxjs/operators';
import {Estado} from '../../../shared/interfaces/estado';
import {Subject} from 'rxjs';
import {Circuito} from '../../../shared/interfaces/circuito';

@Component({
  selector: 'app-mapa-l',
  templateUrl: './mapa-l.component.html',
  styleUrls: ['./mapa-l.component.css']
})
export class MapaLComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() private geojsonObject: GeoJSONPolygon;
  @Input() private slugProduto: string;
  private estado: Estado;
  private geojsonFiltrado: GeoJSONPolygon;
  private unsubscribeEstado: Subject<Estado>;
  private map;
  private legenda;
  private markers;
  baseLayers;
  layers;
  mapFitToBounds: L.LatLngBounds;
  mapFitToBoundsOptions: L.FitBoundsOptions;

  constructor(private estadoService: EstadoService, private changeDetectorRef: ChangeDetectorRef) {
    this.unsubscribeEstado = new Subject<Estado>();
    this.markers = [];
  }

  ngOnInit(): void {
    this.geojsonFiltrado = JSON.parse(JSON.stringify(this.geojsonObject));

    this.baseLayers = {
      'Google Hybrid': tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']}),
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19, attribution: '&copy;' }),
    };

    this.estadoService.onUpdateEstado()
      .pipe(takeUntil(this.unsubscribeEstado))
      .subscribe((novoEstado) => {
          this.estado = novoEstado;
          this.updateGeoJSON();
          this.addLayer();
        }
      );
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  onMapReady(map) {
    this.map = map;
    this.createLegend();
  }

  private updateGeoJSON = () => {
    this.geojsonFiltrado = JSON.parse(JSON.stringify(this.geojsonObject));
    if (this.estado.turno){
      this.geojsonFiltrado.features = this.geojsonFiltrado.features
        .filter((feature) => Number(feature.properties.turno) === Number(this.estado.turno));
    }
    if (this.estado.zona){
      this.geojsonFiltrado.features = this.geojsonFiltrado.features
        .filter((feature) => Number(feature.properties.zona) === Number(this.estado.zona));
    }
    if (this.estado.slugModelo){
      this.geojsonFiltrado.features = this.geojsonFiltrado.features
        .filter((feature) => feature.properties.slug === this.estado.slugModelo);
    }
  }

  private addLayer = () => {
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });
    this.layers = [];
    this.layers.push(L.geoJSON(this.geojsonFiltrado,
      {
        style: this.style,
        onEachFeature: this.onEachFeature,
      }));
    try{
      this.mapFitToBoundsOptions = {maxZoom: 18, animate: true};
      this.mapFitToBounds = this.layers[0].getBounds();
    }
    catch (e) {}
  }

  onEachFeature = (feature, layer): void => {
    const marker = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'bg-light p-1 text-center map-marker',
        html: feature.properties.slug,
        iconSize: [feature.properties.slug.length * 7, 25],
      })
    });
    marker.addTo(this.map);
    this.markers.push(marker);
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
      fillOpacity: 0.5,
    };
  }

  private createLegend = () => {
    this.legenda = L.control.attribution({position: 'bottomleft'});

    this.legenda.onAdd = (map) => {
      const div = L.DomUtil.create('div', 'legenda');
      div.innerHTML += `<div class="legenda-item manha"><i>Manhã</i></div>`;
      div.innerHTML += `<div class="legenda-item tarde"><i>Tarde</i></div>`;
      div.innerHTML += `<div class="legenda-item noite"><i>Noite</i></div>`;
      return div;
    };
    this.legenda.addTo(this.map);
  }

  ngOnDestroy() {
    console.log('destruido');
    this.unsubscribeEstado.next();
    this.unsubscribeEstado.complete();
  }

}
