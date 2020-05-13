import {AfterContentChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Dado} from '../interfaces/dado';
import {DadosGeral} from '../interfaces/dados-geral';
import {DadoAgrupamento} from '../interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../interfaces/extra-agrupamento';
import {Circuito} from '../interfaces/circuito';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit, AfterViewInit, OnChanges, AfterContentChecked {
  @Input() slugProduto: string = null;
  @Input() dados: DadosGeral;
  @Input() circuitos: Circuito[];
  cTeste: Circuito[];

  daodosComparativo: Dado;
  dadosAgrupamento: DadoAgrupamento[];
  extraAgrupamento: ExtraAgrupamento;

  activeComparativo = 0;
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

  @ViewChild('escolhaAgrupamento') escolhaAgrupamento: ElementRef;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.activeComparativo = 0;
    if (this.escolhaAgrupamento) {
      this.escolhaAgrupamento.nativeElement.style.display = 'none';
    }
    this.cTeste = this.circuitos;
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
  }

  ngAfterViewInit(): void {
    this.escolhaAgrupamento.nativeElement.style.display = 'none';

    this.btnGlobal.nativeElement.addEventListener('click', () => {
      this.activeComparativo = 0;
      this.escolhaAgrupamento.nativeElement.style.display = 'none';
    });

    this.btnModelos.nativeElement.addEventListener('click', this.addBtnComparativoListener.bind(this, 'modelos_data', 1));
    this.btnTurnos.nativeElement.addEventListener('click', this.addBtnComparativoListener.bind(this, 'turnos_data', 2));
    this.btnZonas.nativeElement.addEventListener('click', this.addBtnComparativoListener.bind(this, 'zonas_data', 3));
    this.btnAnual.nativeElement.addEventListener('click', this.addBtnComparativoListener.bind(this, 'anos_data', 4));
    this.btnMensal.nativeElement.addEventListener('click', this.addBtnComparativoListener.bind(this, 'meses_data', 5));

    this.btnCircuitos.nativeElement.addEventListener('click', () => {
      this.activeComparativo = 6;
      this.escolhaAgrupamento.nativeElement.style.display = 'none';
    });

    this.btnSum.nativeElement.addEventListener('click', this.addBtnAgrupamentoListener.bind(this, 'sum', 1));
    this.btnAvg.nativeElement.addEventListener('click', this.addBtnAgrupamentoListener.bind(this, 'avg', 2));
    this.btnRat.nativeElement.addEventListener('click', this.addBtnAgrupamentoListener.bind(this, 'rat', 3));
  }

  addBtnComparativoListener = (tipo, int) => {
    this.daodosComparativo = this.dados[tipo];
    this.activeAgrupamento = null;
    this.activeComparativo = int;
    this.escolhaAgrupamento.nativeElement.style.display = 'inline-flex';
  }

  addBtnAgrupamentoListener = (tipo, int) => {
    this.dadosAgrupamento = this.daodosComparativo[tipo];
    this.extraAgrupamento = this.dados.extras[tipo];
    this.activeAgrupamento = int;
  }

}
