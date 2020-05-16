import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GeoJSON} from '../interfaces/geo-json';

@Injectable({
  providedIn: 'root'
})
export class ModelosAPIService {

  private ENDPOINT = 'https://cabi.pt/apiv1/modelos/';

  constructor(private httpClient: HttpClient) {
  }

  public getData(slug: string) {
    return this.httpClient.get<GeoJSON>(`${this.ENDPOINT}${slug}/`);
  }
}
