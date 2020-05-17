import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Circuito} from '../../interfaces/circuito';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Estado} from '../../interfaces/estado';
import {Subject} from 'rxjs';
import {DadosService} from '../../services/dados.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-lista-circuitos',
  templateUrl: './lista-circuitos.component.html',
  styleUrls: ['./lista-circuitos.component.css']
})
export class ListaCircuitosComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() estado: Estado;
  circuitos: Circuito[];
  dataSource = new MatTableDataSource<Circuito>();
  columns: string[];

  error = null;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private dadosService: DadosService) { }

  ngAfterViewInit() {
    this.getDadosCircuitos();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.estado);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.getDadosCircuitos();
  }

  getDadosCircuitos = () => {
    this.circuitos = null;
    this.dataSource.data = null;
    this.dadosService
      .getDataCircutos(
        this.estado.slugProduto,
        this.estado.slugModelo,
        this.estado.zona,
        this.estado.turno,
        this.estado.ano,
        this.estado.mes)
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe((data: any) => {
          this.circuitos = data.results;
          console.log(data);
          this.dataSource.data = this.circuitos;
          this.dataSource.sort = this.sort;
          this.columns = Object.keys(this.circuitos[0]);
        },
        error => {
          this.error = error.message;
        });
  }

  onHandleErro = () => {
    this.error = null;
    this.getDadosCircuitos();
  }

  doFIlter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
