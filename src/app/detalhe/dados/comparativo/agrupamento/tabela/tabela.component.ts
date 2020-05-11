import {Component, Input, OnInit} from '@angular/core';
import {DadoAgrupamento} from '../../../../interfaces/dado-agrupamento';
import {Extra} from '../../../../interfaces/extra';
import {ExtraAgrupamento} from '../../../../interfaces/extra-agrupamento';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  @Input() dadosTabela: DadoAgrupamento[];
  @Input() extrasTabela: ExtraAgrupamento;

  constructor() { }

  ngOnInit(): void {
  }

  formatNumber = (num) => {
    if (num === 0){
      return ' ';
    }
    if (num > 1000){
      return  Math.round(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
    if (num > 100){
      return Math.round(num * 10) / 10;
    }
    return num;
  }

}
