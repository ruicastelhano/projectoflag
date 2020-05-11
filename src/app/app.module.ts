import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroComponent } from './intro/intro/intro.component';
import { FiltroComponent } from './detalhe/filtro/filtro.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { MapaComponent } from './detalhe/filtro/mapa/mapa.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { FormComponent } from './detalhe/filtro/form/form.component';
import { DadosComponent } from './detalhe/dados/dados.component';
import { ComparativoComponent } from './detalhe/dados/comparativo/comparativo.component';
import { AgrupamentoComponent } from './detalhe/dados/comparativo/agrupamento/agrupamento.component';
import { TabelaComponent } from './detalhe/dados/comparativo/agrupamento/tabela/tabela.component';
import { GraficoComponent } from './detalhe/dados/comparativo/agrupamento/conjunto-graficos/grafico/grafico.component';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import { BackgroundColorDirective } from './detalhe/directives/background-color.directive';
import { ConjuntoGraficosComponent } from './detalhe/dados/comparativo/agrupamento/conjunto-graficos/conjunto-graficos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IntroComponent,
    FiltroComponent,
    MapaComponent,
    DetalheComponent,
    FormComponent,
    DadosComponent,
    ComparativoComponent,
    AgrupamentoComponent,
    TabelaComponent,
    GraficoComponent,
    BackgroundColorDirective,
    ConjuntoGraficosComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ChartsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
