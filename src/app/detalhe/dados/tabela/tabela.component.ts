import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DadoAgrupamento} from '../../../shared/interfaces/dado-agrupamento';
import {ExtraAgrupamento} from '../../../shared/interfaces/extra-agrupamento';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() dadosTabela: DadoAgrupamento[];
  @Input() extrasTabela: ExtraAgrupamento;
  @Input() simples: boolean;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<DadoAgrupamento>();

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.data = this.dadosTabela;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void  {
    this.dataSource.data = this.dadosTabela;
  }

  private sortingDataAccessor = (row, column): any => {
    return row.data[column];
  }

  filter = (value: string): void => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getToolTip = (colIndex: number) => {
    return this.extrasTabela.tooltips[colIndex];
  }

}
