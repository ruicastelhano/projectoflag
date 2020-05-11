import {Dado} from './dado';
import {Extra} from './extra';

export interface DadosGeral {
  ano: number;
  anos_data: Dado;
  extras: Extra;
  global_data: Dado;
  mes: number;
  meses_data: Dado;
  modelos_data: Dado;
  slug_modelo: string;
  slug_produto: string;
  turno: number;
  turno_data: Dado;
  zona: number;
  zonas_data: Dado;
}
