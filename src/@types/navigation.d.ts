export type RootStackParamList = {
  Home: { atualizar?: boolean };
  NewObra: undefined;
  ObraDetails: { obraId: string };
  FiscaObra: { obraId: string };
  EnviarEmail: { obraId: string }; 
};
