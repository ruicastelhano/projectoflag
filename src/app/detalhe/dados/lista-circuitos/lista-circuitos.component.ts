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

  // TODO server side sorting

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
  resultadosSize = 0;
  filterString: string;
  currentPage = 1;
  paginas: number;

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
    this.dadosService
      .getDataCircutos(this.estado, url, this.filterString)
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe((data: any) => {
          data.results.forEach(row => {
            delete row.circuito;
          });
          this.circuitos = data.results;
          this.dataSource.data = this.circuitos;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.resultadosSize = data.count;
          this.paginas = Math.ceil(this.resultadosSize / this.pageSize);
          if (!this.columns) {
            this.columns = Object.keys(this.circuitos[0]);
          }
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

  range = (): number[] => {
    const items: number[] = [];
    const limit = this.resultadosSize / this.pageSize;
    for (let i = 1; i <= limit; i++){
      items.push(i);
    }
    return items;
  }

}
