import { PegarCategoriaPorNome } from "../services/database/ICategoriaRepository";

export async function VerificarExistenciaCategoria(nome: string) {
  const categoria = await PegarCategoriaPorNome(nome);
  return categoria ? true : false;
}
