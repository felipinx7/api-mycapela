import { expressDTO } from "../../interfaces/expressDTO";
import { PegarEntradasDizimos } from "../../services/database/IEntradaDizimoRepository";

export async function PegarEntradasDizimoController(express: expressDTO) {
  const entradas = await PegarEntradasDizimos();

  return express.res.status(200).send({
    status: 200,
    message: "Entradas de dízimo encontradas",
    dados: entradas,
  });
}
