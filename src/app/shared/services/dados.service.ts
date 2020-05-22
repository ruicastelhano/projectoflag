import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GeoJSONPolygon} from '../interfaces/geo-j-s-o-n-polygon';
import {Estado} from '../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private ENDPOINTCIRCUITOS = 'https://cabi.pt/apiv1/circuitos/';
  private ENDPOINTDADOS = 'https://cabi.pt/apiv1/resumo2/';
  private ENDPOINTMODELOS = 'https://cabi.pt/apiv1/modelos/';
  private headers: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({});
  }

  public getDataModelos = (slug: string) => {
    return this.httpClient.get<GeoJSONPolygon>(`${this.ENDPOINTMODELOS}${slug}/`);
  }

  public getDataDados = (estado: Estado) => {
    const params = {};
    params['slug_produto'] = estado.slugProduto;
    const arrayAux = [[estado.slugModelo, 'slug_modelo'], [estado.zona, 'zona'], [estado.turno, 'turno'], [estado.ano, 'ano'], [estado.mes, 'mes']];
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

  public getDataCircutos = (estado: Estado, url: string, filterString: string, ordering: string) => {
    const params = {};
    params['ordering'] = ordering;

    if (filterString) {
      params['search'] = filterString;
      return this.httpClient.get(`${this.ENDPOINTCIRCUITOS}${estado.slugProduto}/`, {params});
    }

    if (url){
      return this.httpClient.get(url);
    }

    if (estado.slugModelo) {
      params['circuito__slug'] = estado.slugModelo;
    }
    if (estado.turno) {
      params['circuito__turno'] = estado.turno;
    }
    if (estado.zona) {
      params['circuito__zona'] = estado.zona;
    }
    if (estado.mes) {
      params['data__gte'] = `${Number(estado.ano)}-${Number(estado.mes)}-01`;
      if (Number(estado.mes) === 12) {
        params['data__lte'] = `${Number(estado.ano) + 1}-01-01`;
      }
      else {
        params['data__lte'] = `${Number(estado.ano)}-${Number(estado.mes) + 1}-01`;
      }
    }
    else if (estado.ano) {
      params['data__gte'] = `${Number(estado.ano)}-01-01`;

      params['data__lte'] = `${Number(estado.ano) + 1}-01-01`;
    }
    return this.httpClient.get(`${this.ENDPOINTCIRCUITOS}${estado.slugProduto}/`, {params});
  }

}
