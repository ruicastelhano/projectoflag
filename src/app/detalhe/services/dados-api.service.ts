import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadosAPIService {

  private ENDPOINT = 'https://cabi.pt/apiv1/resumo/';

  constructor(private httpClient: HttpClient) {
  }

  public getData(slugProduto: string, slugModelo: string, zona: number, turno: number, ano: number, mes: string) {
    const params = {};
    params['slug_produto'] = slugProduto;
    const arrayAux = [[slugModelo, 'slug_modelo'], [zona, 'zona'], [turno, 'turno'], [ano, 'ano'], [mes, 'mes']];
    arrayAux.forEach((par) => {
      if (par[0]) {
        params[par[1]] = par[0];
      }
      else {
        params[`${par[1]}__isnull`] = 'True';
      }
    });
    return this.httpClient.get(`${this.ENDPOINT}`, {params});
  }
}
