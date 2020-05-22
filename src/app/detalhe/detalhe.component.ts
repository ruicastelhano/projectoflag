import {ActivatedRoute} from '@angular/router';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DadosGeral} from '../shared/interfaces/dados-geral';
import {Estado} from '../shared/interfaces/estado';
import {DadosService} from '../shared/services/dados.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {EstadoService} from '../shared/services/estado.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('toggleFiltroButton') toggleFiltroButton: ElementRef;
  @Output() slugProduto: string;
  private unsubscribeAPI: Subject<void>;
  dados: DadosGeral;
  estado: Estado;
  error: string;
  showFiltro: boolean;

  constructor(private activatedRoute: ActivatedRoute, private dadosService: DadosService,  private estadoService: EstadoService) {
    this.unsubscribeAPI = new Subject<void>();
    this.showFiltro = false;
  }

  ngAfterViewInit(): void {
    this.toggleFiltroButton.nativeElement.addEventListener('click', this.toggleShowFiltro);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.slugProduto = params.slug;
    });
    this.estadoService.onUpdateEstado()
      .subscribe(
        (novoEstado) => {
          this.estado = novoEstado;
          this.getDadosData();
        }, error => {
          this.error = error.message;
        }
      );
    this.estado = {
      slugProduto: this.slugProduto,
      ano: null,
      mes: null,
      zona: null,
      turno: null,
      slugModelo: null,
    };
    this.estadoService.setEstado(this.estado);
    this.getDadosData();
  }

  private getDadosData = (): void => {
    this.unsubscribeAPI.next();
    this.unsubscribeAPI.complete();
    this.dadosService
      .getDataDados(this.estado)
      .pipe(takeUntil(this.unsubscribeAPI))
      .subscribe(
        (data: any) => {
          this.dados = data[0];
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

  ngOnDestroy = () => {
    this.unsubscribeAPI.next();
    this.unsubscribeAPI.complete();
  }

}


