import {ActivatedRoute} from '@angular/router';
import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DadosGeral} from '../shared/interfaces/dados-geral';
import {Estado} from '../shared/interfaces/estado';
import {DadosService} from '../shared/services/dados.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, AfterViewInit {
  @ViewChild('toggleFiltroButton') toggleFiltroButton: ElementRef;
  @Output() slugProduto: string;
  dados: DadosGeral;
  estado: Estado;
  error = null;
  showFiltro = false;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private dadosService: DadosService) { }

  ngAfterViewInit(): void {
    this.toggleFiltroButton.nativeElement.addEventListener('click', this.toggleShowFiltro);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.slugProduto = params.slug;
    });
    this.estado = {
      slugProduto: this.slugProduto,
      ano: null,
      mes: null,
      zona: null,
      turno: null,
      slugModelo: null,
    };
    this.getDadosData();
  }

  OnDataChanged = (data): void => {
    this.estado = data;
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.getDadosData();
  }

  private getDadosData = (): void => {
    this.dadosService
      .getDataDados(this.estado)
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        (data: any) => {
          this.dados = data[0];
          console.log(data[0])
          },
        error => {
          this.error = error.message;
        });
  }

  private toggleShowFiltro = (): void => {
    this.showFiltro = !this.showFiltro;
  }

  onHandleErro = (): void => {
    this.error = null;
    this.getDadosData();
  }
}


