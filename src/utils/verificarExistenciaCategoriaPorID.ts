import { PegarCategoriaPorID } from "../services/database/ICategoriaRepository";

export async function VerificarExistenciaCategoriaPorID(id: string) {
  const categoria = await PegarCategoriaPorID(id);
  return categoria ? true : false;
}