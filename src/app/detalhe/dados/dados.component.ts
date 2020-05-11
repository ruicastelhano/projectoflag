import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Dado} from '../interfaces/dado';
import {DadosGeral} from '../interfaces/dados-geral';
import {DadoAgrupamento} from '../interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../interfaces/extra-agrupamento';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, AfterViewInit, OnChanges  {
  @Input() slugProduto: string = null;
  @Input() dados: DadosGeral;

  daodosComparativo: Dado;
  dadosAgrupamento: DadoAgrupamento[];
  extraAgrupamento: ExtraAgrupamento;

  activeComparativo: number;
  activeAgrupamento: number;

  @ViewChild('btnGlobal') btnGlobal: ElementRef;
  @ViewChild('btnModelos') btnModelos: ElementRef;
  @ViewChild('btnTurnos') btnTurnos: ElementRef;
  @ViewChild('btnZonas') btnZonas: ElementRef;
  @ViewChild('btnAnual') btnAnual: ElementRef;
  @ViewChild('btnMensal') btnMensal: ElementRef;
  @ViewChild('btnCircuitos') btnCircuitos: ElementRef;
  @ViewChild('btnSum') btnSum: ElementRef;
  @ViewChild('btnAvg') btnAvg: ElementRef;
  @ViewChild('btnRat') btnRat: ElementRef;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dados);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.btnGlobal.nativeElement.addEventListener('click', () => {
      this.activeComparativo = 0;
    });
    this.btnModelos.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dados['modelos_data'];
      this.activeAgrupamento = null;
      this.activeComparativo = 1;
    });
    this.btnTurnos.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dados['turnos_data'];
      this.activeAgrupamento = null;
      this.activeComparativo = 2;
    });
    this.btnZonas.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dados['zonas_data'];
      this.activeAgrupamento = null;
      this.activeComparativo = 3;
    });
    this.btnAnual.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dados['anos_data'];
      this.activeAgrupamento = null;
      this.activeComparativo = 4;
    });
    this.btnMensal.nativeElement.addEventListener('click', () => {
      this.daodosComparativo = this.dados['meses_data'];
      this.activeAgrupamento = null;
      this.activeComparativo = 5;
    });
    this.btnCircuitos.nativeElement.addEventListener('click', () => {
      this.activeComparativo = 6;
    });

    this.btnSum.nativeElement.addEventListener('click', () => {
      this.dadosAgrupamento = this.daodosComparativo.sum;
      this.extraAgrupamento = this.dados.extras.sum;
      this.activeAgrupamento = 0;
    });
    this.btnAvg.nativeElement.addEventListener('click', () => {
      this.dadosAgrupamento = this.daodosComparativo.avg;
      this.extraAgrupamento = this.dados.extras.avg;
      this.activeAgrupamento = 1;
    });
    this.btnRat.nativeElement.addEventListener('click', () => {
      this.dadosAgrupamento = this.daodosComparativo.rat;
      this.extraAgrupamento = this.dados.extras.rat;
      this.activeAgrupamento = 2;
    });

  }


}
