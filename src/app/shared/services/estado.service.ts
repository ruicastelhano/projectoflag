import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Estado} from '../interfaces/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private estado$ = new Subject<Estado>();

  updateEstado = (novoEstado: Estado) => {
    this.estado$.next(novoEstado);
  }

  onUpdateEstado = () => {
    return this.estado$.asObservable();
  }

}
