import {Component, Input, OnInit} from '@angular/core';
import {Circuito} from '../../interfaces/circuito';

@Component({
  selector: 'app-lista-circuitos',
  templateUrl: './lista-circuitos.component.html',
  styleUrls: ['./lista-circuitos.component.css']
})
export class ListaCircuitosComponent implements OnInit {
  @Input() circuitos: Circuito[];

  constructor() { }

  ngOnInit(): void {
  }

}
