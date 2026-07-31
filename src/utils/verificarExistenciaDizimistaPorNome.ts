import { PegarDizimistaPorNome } from "../services/database/IDizimistaRepository";

export async function VerificarExistenciaDizimistaPorNome(nome: string) {
  const dizimista = await PegarDizimistaPorNome(nome);

  return dizimista ? true : false;
}
