import {ActivatedRoute} from '@angular/router';
import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DadosGeral} from './interfaces/dados-geral';
import {Estado} from './interfaces/estado';
import {DadosService} from './services/dados.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, AfterViewInit {
  @Output() slugProduto: string;
  dados: DadosGeral;
  estado: Estado;
  error = null;

  @ViewChild('toggleFiltroButton') toggleFiltroButton: ElementRef;
  showFiltro = false;
  texto = 'Esconder';

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private dadosService: DadosService) { }


  ngAfterViewInit() {
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

  OnDataChanged = (data) => {
    this.estado = data;
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.getDadosData();
  }

  getDadosData = () => {
    this.dadosService
      .getDataDados(
        this.estado.slugProduto,
        this.estado.slugModelo,
        this.estado.zona,
        this.estado.turno,
        this.estado.ano,
        this.estado.mes)
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(
        (data: any) => {
          this.dados = data[0];
          console.log(this.dados);
          },
        error => {
          this.error = error.message;
        });
  }

  toggleShowFiltro = () => {
    if (this.showFiltro) {
      this.showFiltro = false;
      this.texto = 'Mostrar';
    }
    else {
      this.showFiltro = true;
      this.texto = 'Esconder';
    }
  }

  onHandleErro = () => {
    this.error = null;
    this.getDadosData();
  }
}


