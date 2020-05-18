export interface Circuito {
  slug: string;
  dia: string;
  circuito: {slug: string, zona: number, turno: number} | {modelo_seletivo_macro: {slug: string, zona: number, turno: number}};
  inicio_time: string;
  fim_time: string;
  duracao: string;
  km: number;
  l: number;
  recolhas_count: number;
  lavagens_count: number;
  abandonados_count: number;
  pedidos_count: number;
  motoristas: number[];
  cantoneiros: number[];
  ton: number;
  array_viaturas: number[];
  pesagens_tratolixo_count: number;
  ocorrencias_count: number;
  abandonados_count_ofu: number;
  abandonados_count_cj: number;
  loca: number;
  cont: number;
  lava: number;
  niv: number;
  fcn: number;
}
