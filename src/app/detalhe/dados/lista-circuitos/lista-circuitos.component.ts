import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Circuito} from '../../../shared/interfaces/circuito';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Estado} from '../../../shared/interfaces/estado';
import {Subject} from 'rxjs';
import {DadosService} from '../../../shared/services/dados.service';
import {takeUntil} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-lista-circuitos',
  templateUrl: './lista-circuitos.component.html',
  styleUrls: ['./lista-circuitos.component.css']
})
export class ListaCircuitosComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() estado: Estado;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  circuitos: Circuito[];
  dataSource = new MatTableDataSource<Circuito>();
  columns: string[];
  error = null;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  next: string;
  previous: string;
  pageSize = 20;
  resultsLength = 0;

  constructor(private dadosService: DadosService) { }

  ngAfterViewInit() {
    this.getDadosCircuitos(null);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.getDadosCircuitos(null);
  }

  private getDadosCircuitos = (url: string): void  => {
    this.circuitos = null;
    this.dataSource.data = null;
    this.dadosService
      .getDataCircutos(this.estado, url)
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe((data: any) => {
          data.results.forEach(row => {
            delete row.circuito;
          });
          this.circuitos = data.results;
          this.dataSource.data = this.circuitos;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.circuitos = data.results;
          this.resultsLength = data.count;
          this.columns = Object.keys(this.circuitos[0]);
          if (data.next) {
            this.next = data.next;
          }
          if (data.previous) {
            this.previous = data.previous;
          }
        },
        error => {
          this.error = error.message;
        }
      );
  }

  fetchNext(): void  {
    this.getDadosCircuitos(this.next);
  }

  fetchPrevious(): void {
    this.getDadosCircuitos(this.previous);
  }

  onHandleErro = (): void => {
    this.error = null;
    this.getDadosCircuitos(null);
  }

  filter = (value: string): void => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  range = (): number[] => {
    const items: number[] = [];
    const limit = this.resultsLength / this.pageSize;
    for (let i = 1; i <= limit; i++){
      items.push(i);
    }
    return items;
  }

}
