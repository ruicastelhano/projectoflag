import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelosAPIService {

  private ENDPOINT = 'https://cabi.pt/apiv1/modelos/';

  constructor(private httpClient: HttpClient) {
  }

  public getData(slug: string) {
    return this.httpClient.get(`${this.ENDPOINT}${slug}/`);
  }
}
