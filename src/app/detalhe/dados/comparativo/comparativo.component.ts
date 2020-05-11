import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Dado} from '../../interfaces/dado';
import {Extra} from '../../interfaces/extra';
import {DadoAgrupamento} from '../../interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../../interfaces/extra-agrupamento';

@Component({
  selector: 'app-comparativo',
  templateUrl: './comparativo.component.html',
  styleUrls: ['./comparativo.component.css']
})
export class ComparativoComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() dados: Dado;
  @Input() extras: Extra;
  @Input() slugProduto: string;
  active: number;

  dadosAgrupamento: DadoAgrupamento[];
  extraAgrupamento: ExtraAgrupamento;

  disabelButtons = true;

  @ViewChild('btnSum') btnSum: ElementRef;
  @ViewChild('btnAvg') btnAvg: ElementRef;
  @ViewChild('btnRat') btnRat: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dados);
  }

  ngAfterViewInit(): void {
    this.btnSum.nativeElement.addEventListener('click', () => {
      this.dadosAgrupamento = this.dados.sum;
      this.extraAgrupamento = this.extras.sum;
    });
    this.btnAvg.nativeElement.addEventListener('click', () => {
      this.dadosAgrupamento = this.dados.avg;
      this.extraAgrupamento = this.extras.avg;
    });
    this.btnRat.nativeElement.addEventListener('click', () => {
      this.dadosAgrupamento = this.dados.rat;
      this.extraAgrupamento = this.extras.rat;
    });
  }

}
