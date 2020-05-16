import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeoJSON} from '../interfaces/geo-json';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private ENDPOINTCIRCUITOS = 'https://cabi.pt/apiv1/circuitos/';
  private ENDPOINTDADOS = 'https://cabi.pt/apiv1/resumo/';
  private ENDPOINTMODELOS = 'https://cabi.pt/apiv1/modelos/';

  constructor(private httpClient: HttpClient) { }

  public getDataModelos(slug: string) {
    return this.httpClient.get<GeoJSON>(`${this.ENDPOINTMODELOS}${slug}/`);
  }

  public getDataDados(slugProduto: string, slugModelo: string, zona: number, turno: number, ano: number, mes: string) {
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
    return this.httpClient.get(`${this.ENDPOINTDADOS}`, {params});
  }

  public getDataCircutos(slugProduto: string, slugModelo: string, zona: number, turno: number, ano: number, mes: any) {
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
      params['data__gte'] = `${Number(ano)}-${Number(mes)}-01`;
      if (Number(mes) === 12) {
        params['data__lte'] = `${Number(ano) + 1}-01-01`;
      }
      else {
        params['data__lte'] = `${Number(ano)}-${Number(mes) + 1}-01`;
      }
    }
    else if (ano) {
      params['data__gte'] = `${Number(ano)}-01-01`;

      params['data__lte'] = `${Number(ano) + 1}-01-01`;
    }
    console.log(params);
    return this.httpClient.get(`${this.ENDPOINTCIRCUITOS}${slugProduto}/`, {params});
  }

}
