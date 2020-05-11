import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DadosAPIService} from '../services/dados-api.service';
import {Dado} from '../interfaces/dado';
import {DadosGeral} from '../interfaces/dados-geral';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, AfterViewInit, OnChanges  {
  @Input() slugProduto: string = null;
  @Input() dadosGeral: DadosGeral;
  daodosComparativo: Dado;
  turno: number;

  active: number;

  @ViewChild('btnGlobal') btnGlobal: ElementRef;
  @ViewChild('btnModelos') btnModelos: ElementRef;
  @ViewChild('btnTurnos') btnTurnos: ElementRef;
  @ViewChild('btnZonas') btnZonas: ElementRef;
  @ViewChild('btnAnual') btnAnual: ElementRef;
  @ViewChild('btnMensal') btnMensal: ElementRef;
  @ViewChild('btnCircuitos') btnCircuitos: ElementRef;

  buttons: ElementRef[] = [this.btnGlobal, this.btnModelos, this.btnTurnos, this.btnZonas, this.btnAnual, this.btnMensal,
    this.btnCircuitos];

  constructor(private dadosAPIService: DadosAPIService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dadosGeral);
  }

  getColor = () => {
    switch (this.slugProduto) {
      case 'ind':
        return 'btn-secondary';
      case 'pap':
        return 'btn-primary';
      case 'pla':
        return 'btn-warning';
      case 'vid':
        return 'btn-success';
      case 'rub':
        return 'btn-rub';
      case 'cj':
        return 'btn-cj';
      case 'ofu':
        return 'btn-ofu';
    }
  }

  ngOnInit(): void {
  }

  bck = (element: ElementRef) => {
    this.buttons.forEach((btn) => {
      btn.nativeElement.style.background = 'red';
    });
    element.nativeElement.style.background = 'yellow';
  }

  ngAfterViewInit(): void {
    this.btnModelos.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dadosGeral['modelos_data'];
    });
    this.btnTurnos.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dadosGeral['turnos_data'];
    });
    this.btnZonas.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dadosGeral['zonas_data'];
    });
    this.btnAnual.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dadosGeral['anos_data'];
    });
    this.btnMensal.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dadosGeral['meses_data'];
    });

  }


}
