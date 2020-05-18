import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Modelo} from '../../../shared/interfaces/modelo';
import {Estado} from '../../../shared/interfaces/estado';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
  @Input() slugProduto: string;
  @Input() zonas: number[] = [];
  @Input() turnos: number[] = [];
  @Input() modelos: Modelo[] = [];
  @Output() dataChanged = new EventEmitter<Estado>();
  @ViewChild('anoElement') anoElement: ElementRef;
  @ViewChild('mesElement') mesElement: ElementRef;
  @ViewChild('zonaElement') zonaElement: ElementRef;
  @ViewChild('turnoElement') turnoElement: ElementRef;
  @ViewChild('modeloElement') modeloElement: ElementRef;
  anos: number[];
  meses: string[];
  estado: Estado;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.getEstado();
  }

  getEstado = (): void => {
    let slugModelo = null;
    let zona = null;
    let turno = null;
    let ano = null;
    let mes = null;

    if (!this.anoElement.nativeElement.value.includes('Tod')){
      ano = this.anoElement.nativeElement.value;
    }
    if (!this.mesElement.nativeElement.value.includes('Tod')){
      mes = this.mesElement.nativeElement.value;
    }
    if (!this.zonaElement.nativeElement.value.includes('Tod')){
      zona = this.zonaElement.nativeElement.value;
    }
    if (!this.turnoElement.nativeElement.value.includes('Tod')){
      turno = this.turnoElement.nativeElement.value;
    }
    if (!this.modeloElement.nativeElement.value.includes('Tod')){
      slugModelo = this.modeloElement.nativeElement.value;
    }

    let anoLocal = null;
    let mesLocal = null;
    if (mes) {
      anoLocal = parseInt(mes.substring(0, 4), 10);
      mesLocal = parseInt(mes.substring(5, 7), 10);
      this.anoElement.nativeElement.value = anoLocal;
    }
    else {
      anoLocal = ano;
      mesLocal = mes;
    }

    if (slugModelo) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.modelos.length; i++){
        if (this.modelos[i].slug === slugModelo) {
          this.turnoElement.nativeElement.value = this.modelos[i].turno;
          turno = this.modelos[i].turno;
          this.zonaElement.nativeElement.value = this.modelos[i].zona;
          zona = this.modelos[i].zona;
          break;
        }
      }
    }

    this.estado.ano = anoLocal;
    this.estado.mes = mesLocal;
    this.estado.turno = turno;
    this.estado.zona = zona;
    this.estado.slugModelo = slugModelo;
    this.dataChanged.emit(this.estado);
  }

  ngOnInit(): void {
    this.estado = {
      slugProduto: this.slugProduto,
      ano: null,
      mes: null,
      zona: null,
      turno: null,
      slugModelo: null,
    };

    this.anos = [];
    this.meses = [];
    let ano = new Date().getFullYear();
    this.anos.push(ano);
    for (let i = new Date().getMonth() + 1; i > 0; i--){
      this.meses.push(`${ano}/${i.toString().padStart(2, '0')}`);
    }
    ano--;
    while (ano >= 2018 ){
      this.anos.push(ano);
      for (let i = 12; i > 0; i--){
        this.meses.push(`${ano}/${i.toString().padStart(2, '0')}`);
      }
      ano--;
    }
  }

}
