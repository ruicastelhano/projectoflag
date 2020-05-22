export interface Circuito {
  modeloDeCircuito: string;
  dia: string;
  circuito: {slug: string, zona: number, turno: number} | {modelo_seletivo_macro: {slug: string, zona: number, turno: number}};
  viaturas: number[];
  motoristas: number[];
  cantoneiros: number[];
  inicio: string;
  fim: string;
  duracao: string;
  pesoResiduos: number;
  descargas: number;
  distanciaPercorrida: number;
  consumo: number;
  ocorrencias: number;
  contentoresRecolhidos?: number;
  contentoresLavados?: number;
  abandonados?: number;
  pedidos?: number;
  percentagemLocaisComRecolhas?: number;
  percentagemContentoresRecolhidos?: number;
  percentagemContentoresLavados?: number;
  nivelMedioDeEnchimento?: number;
  percentagemDeRecolhasComNivel?: number;
}
