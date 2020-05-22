import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroComponent} from './intro/intro/intro.component';
import {DetalheComponent} from './detalhe/detalhe.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IntroComponent },
  { path: ':slug', component: DetalheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
