import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CircuitosAPIService {

  private ENDPOINT = 'https://cabi.pt/apiv1/circuitos/';

  constructor(private httpClient: HttpClient) {
  }

  public getData(slugProduto: string, slugModelo: string, zona: number, turno: number, ano: number, mes: number) {
    const params = {};
    if (slugModelo) {
      params['circuito__slug'] = slugModelo;
    }
    if (turno) {
      params['circuito__turno'] = turno;
    }
    if (zona) {
      params['circuito__zona'] = zona;
    }
    if (mes) {
      params['data__gte'] = `${ano}-${mes}-01}`;
      if (mes === 12) {
        params['data__lte'] = `${ano + 1}-01-01}`;
      }
      else {
        params['data__lte'] = `${ano}-${mes + 1}-01}`;
      }
    }
    else if (ano) {
      params['data__gte'] = `${ano}-01-01}`;
      params['data__lte'] = `${ano + 1}-01-01}`;
    }
    return this.httpClient.get(`${this.ENDPOINT}${slugProduto}/`, {params});
  }
}
