import { expressDTO } from "../../interfaces/expressDTO";
import { CriarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarEntradaDizimoController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.idCapela || !dados.idDizimista || !dados.valor || !dados.data) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar idCapela, idDizimista, valor e data",
    });
  }

  const capelaExistente = await VerificarExistenciaUsuario("capela", dados.idCapela);

  if (!capelaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Capela não encontrada",
    });
  }

  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.idDizimista);

  if (!dizimistaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Dizimista não encontrado",
    });
  }

  await CriarEntradaDizimo(dados, dados.idDizimista, dados.idCapela);

  return express.res.status(201).send({
    status: 201,
    message: "Entrada de dízimo criada com sucesso",
    dados,
  });
}
