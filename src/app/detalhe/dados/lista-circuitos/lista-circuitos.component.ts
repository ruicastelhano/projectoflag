import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Circuito} from '../../../shared/interfaces/circuito';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Estado} from '../../../shared/interfaces/estado';
import {Subject} from 'rxjs';
import {DadosService} from '../../../shared/services/dados.service';
import {map, takeUntil, tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {EstadoService} from '../../../shared/services/estado.service';

@Component({
  selector: 'app-lista-circuitos',
  templateUrl: './lista-circuitos.component.html',
  styleUrls: ['./lista-circuitos.component.css']
})
export class ListaCircuitosComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() estado: Estado;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private unsubscribeCircuitos: Subject<Circuito[]>;
  private unsubscribeEstado: Subject<Estado>;
  private orderingFilter: string;
  resultadosSize: number;
  circuitos: Circuito[];
  dataSource: MatTableDataSource<Circuito>;
  columns: string[];
  error = null;
  next: string;
  previous: string;
  pageSize: number;
  filterString: string;
  currentPage: number;
  paginas: number;

  constructor(private dadosService: DadosService, private estadoService: EstadoService) {
    this.unsubscribeCircuitos = new Subject<Circuito[]>();
    this.unsubscribeEstado = new Subject<Estado>();
    this.dataSource = new MatTableDataSource<Circuito>();
    this.orderingFilter = '-dia';
    this.pageSize = 20;
    this.resultadosSize = 0;
    this.currentPage = 1;
  }

  ngAfterViewInit() {
    this.getDadosCircuitos(null);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.estadoService.onUpdateEstado()
      .pipe(tap(v => console.log(this.estado, v)))
      .pipe(takeUntil(this.unsubscribeEstado))
      .subscribe((novoEstado) => {
          this.estado = novoEstado;
          this.getDadosCircuitos(null);
        },
        error => { this.error = error.message; }
      );
  }

  private getDadosCircuitos = (url: string): void  => {
    this.unsubscribeCircuitos.next();
    this.unsubscribeCircuitos.complete();
    this.dadosService
      .getDataCircutos(this.estado, url, this.filterString, this.orderingFilter)
      .pipe(takeUntil(this.unsubscribeCircuitos))
      .pipe(map((data: any) => {
        data.results.forEach(row => {delete row.circuito; });
        this.resultadosSize = data.count;
        if (data.next) {this.next = data.next; }
        if (data.previous) {this.previous = data.previous; }
        return data.results;
      }))
      .subscribe((data: any) => {
          this.circuitos = data;
          this.dataSource.data = this.circuitos;
          this.paginas = Math.ceil(this.resultadosSize / this.pageSize);
          if (!this.columns) {this.columns = Object.keys(this.circuitos[0]); }
        },
        error => {this.error = error.message; }
      );
  }

  fetchNext(): void  {
    this.filterString = null;
    this.currentPage++;
    this.getDadosCircuitos(this.next);
  }

  fetchPrevious(): void {
    this.filterString = null;
    this.currentPage--;
    this.getDadosCircuitos(this.previous);
  }

  onHandleErro = (): void => {
    this.error = null;
    this.getDadosCircuitos(null);
  }

  filter = (value: string): void => {
    this.filterString = value;
    this.currentPage = 1;
    this.getDadosCircuitos(null);
  }

  changeOrder = (field: string) => {
    if (this.orderingFilter.replace('-', '') === field.replace('-', '')){
      this.orderingFilter = this.orderingFilter.includes('-') ? field : `-${field}`;
    }
    else {this.orderingFilter = field; }
    this.getDadosCircuitos(null);
  }

  ngOnDestroy() {
    this.unsubscribeCircuitos.next();
    this.unsubscribeCircuitos.complete();
    this.unsubscribeEstado.next();
    this.unsubscribeEstado.complete();
  }

}
