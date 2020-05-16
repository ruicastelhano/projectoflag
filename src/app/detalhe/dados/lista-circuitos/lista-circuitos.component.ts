import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Circuito} from '../../interfaces/circuito';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-lista-circuitos',
  templateUrl: './lista-circuitos.component.html',
  styleUrls: ['./lista-circuitos.component.css']
})
export class ListaCircuitosComponent implements OnInit, AfterViewInit, OnChanges{
  @Input() circuitos: Circuito[];
  dataSource = new MatTableDataSource<Circuito>();
  columns: string[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.data = this.circuitos;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.columns = Object.keys(this.circuitos[0]);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.circuitos;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFIlter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
