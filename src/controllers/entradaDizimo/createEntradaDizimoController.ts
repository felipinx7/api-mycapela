import { expressDTO } from "../../interfaces/expressDTO";
import { CriarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarEntradaDizimoController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.idCapela || !dados.idDizimista || !dados.valor || !dados.data) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar idCapela, idDizimista, valor e data",
      status: 400,
      express: express,
    });
  }

  const capelaExistente = await VerificarExistenciaUsuario("capela", dados.idCapela);

  if (!capelaExistente) {
    return RespostasDasRequisicoes({
      message: "Capela não encontrada",
      status: 404,
      express: express,
    });
  }

  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.idDizimista);

  if (!dizimistaExistente) {
    return RespostasDasRequisicoes({
      message: "Dizimista não encontrado",
      status: 404,
      express: express,
    });
  }

  await CriarEntradaDizimo(dados, dados.idDizimista, dados.idCapela);

  return RespostasDasRequisicoes({
    message: "Entrada de dízimo criada com sucesso",
    status: 201,
    data: dados,
    express: express,
  });
}
