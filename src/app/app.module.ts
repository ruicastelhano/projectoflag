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
import { TabelaComponent } from './detalhe/dados/tabela/tabela.component';
import { GraficoComponent } from './detalhe/dados/conjunto-graficos/grafico/grafico.component';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import { BackgroundColorDirective } from './detalhe/directives/background-color.directive';
import { ConjuntoGraficosComponent } from './detalhe/dados/conjunto-graficos/conjunto-graficos.component';
import { ToggleDisplayDirective } from './detalhe/directives/toggle-display.directive';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ListaCircuitosComponent } from './detalhe/dados/lista-circuitos/lista-circuitos.component';

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
    TabelaComponent,
    GraficoComponent,
    BackgroundColorDirective,
    ConjuntoGraficosComponent,
    ToggleDisplayDirective,
    ListaCircuitosComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ChartsModule,
        FormsModule,


        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        NoopAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
