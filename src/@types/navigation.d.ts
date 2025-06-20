export type RootStackParamList = {
  Home: undefined;
  NewObra: undefined;
  ObraDetails: { obraId: string };
  FiscaObra: { obraId: string };
  EnviarEmail: { obraId: string }; // ✅ aqui definimos que EnviarEmail recebe um param
};
