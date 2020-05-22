import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {IntroComponent} from './intro/intro/intro.component';
import {FiltroComponent} from './detalhe/filtro/filtro.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MapaComponent} from './detalhe/filtro/mapa/mapa.component';
import {DetalheComponent} from './detalhe/detalhe.component';
import {FormComponent} from './detalhe/filtro/form/form.component';
import {DadosComponent} from './detalhe/dados/dados.component';
import {TabelaComponent} from './detalhe/dados/tabela/tabela.component';
import {GraficoComponent} from './detalhe/dados/conjunto-graficos/grafico/grafico.component';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {BackgroundColorDirective} from './shared/directives/background-color.directive';
import {ConjuntoGraficosComponent} from './detalhe/dados/conjunto-graficos/conjunto-graficos.component';
import {ToggleDisplayDirective} from './shared/directives/toggle-display.directive';
import {ListaCircuitosComponent} from './detalhe/dados/lista-circuitos/lista-circuitos.component';
import {MaterialModule} from './material.module';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {InterceptorService} from './shared/services/interceptor.service';
import {HttpCancelService} from './shared/services/http-cancel.service';
import {getPaginatorIntl} from './detalhe/dados/tabela/pt-paginator-intl';
import {SpinnerComponent} from './shared/components/spinner/spinner.component';
import {FormatNumbersPipe} from './shared/pipes/format-numbers.pipe';
import {CamelCaseToTitlePipe} from './shared/pipes/camel-caseto-title.pipe';
import {AutenticacaoInterceptorService} from './shared/services/autenticacao-interceptor.service';
import {MapaLComponent} from './detalhe/filtro/mapa-l/mapa-l.component';


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
    ListaCircuitosComponent,
    SpinnerComponent,
    MapaLComponent,
    FormatNumbersPipe,
    CamelCaseToTitlePipe,
  ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ChartsModule,
        FormsModule,
        MaterialModule,
        MatPaginatorModule,
        LeafletModule,
    ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getPaginatorIntl(),
    },
    HttpCancelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
