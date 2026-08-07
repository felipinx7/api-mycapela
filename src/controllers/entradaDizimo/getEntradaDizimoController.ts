import { expressDTO } from "../../interfaces/expressDTO";
import { PegarEntradasDizimos } from "../../services/database/IEntradaDizimoRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarEntradasDizimoController(express: expressDTO) {
  const entradas = await PegarEntradasDizimos();

  return RespostasDasRequisicoes({
    message: "Entradas de dízimo encontradas",
    status: 200,
    data: entradas,
    express: express,
  });
}
