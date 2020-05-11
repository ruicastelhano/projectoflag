import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Modelo} from '../../interfaces/modelo';
import {DadosAPIService} from '../../services/dados-api.service';
import {Dado} from '../../interfaces/dado';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
  @Input() slugProduto: string;
  anos: number[];
  meses: string[];
  @Input() zonas: number[] = [];
  @Input() turnos: number[] = [];
  @Input() modelos: Modelo[] = [];

  @ViewChild('anoElement') anoElement: ElementRef;
  @ViewChild('mesElement') mesElement: ElementRef;
  @ViewChild('zonaElement') zonaElement: ElementRef;
  @ViewChild('turnoElement') turnoElement: ElementRef;
  @ViewChild('modeloElement') modeloElement: ElementRef;

  @Output() dataChanged = new EventEmitter<Dado>();

  constructor(private dadosAPIService: DadosAPIService) {
    this.anos = [];
    this.meses = [];
    let ano = new Date().getFullYear();
    this.anos.push(ano);
    for (let i = new Date().getMonth() + 1; i > 0; i--){
      this.meses.push(`${ano}/${i.toString().padStart(2, '0')}`);
    }
    ano--;
    while (ano >= 2018 ){
      this.anos.push(ano);
      for (let i = 12; i > 0; i--){
        this.meses.push(`${ano}/${i.toString().padStart(2, '0')}`);
      }
      ano--;
    }
  }

  ngAfterViewInit(): void {
    this.getData();
  }

  getData(){
    const slugProduto = this.slugProduto;
    let slugModelo = null;
    let zona = null;
    let turno = null;
    let ano = null;
    let mes = null;

    if (!this.anoElement.nativeElement.value.includes('Tod')){
      ano = this.anoElement.nativeElement.value;
    }
    if (!this.mesElement.nativeElement.value.includes('Tod')){
      mes = this.mesElement.nativeElement.value;
    }
    if (!this.zonaElement.nativeElement.value.includes('Tod')){
      zona = this.zonaElement.nativeElement.value;
    }
    if (!this.turnoElement.nativeElement.value.includes('Tod')){
      turno = this.turnoElement.nativeElement.value;
    }
    if (!this.modeloElement.nativeElement.value.includes('Tod')){
      slugModelo = this.modeloElement.nativeElement.value;
    }

    this.dadosAPIService.getData(slugProduto, slugModelo, zona, turno, ano, mes).subscribe((data: any) => {
      this.dataChanged.emit(data[0]);
    });
  }

  ngOnInit(): void {
  }


}
