import { expressDTO } from "../../interfaces/expressDTO";
import { PegarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarEntradaDizimoController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar um ID",
      status: 400,
      express: express,
    });
  }

  const entradaExistente = await VerificarExistenciaUsuario("entradaDizimo", dados.id);

  if (!entradaExistente) {
    return RespostasDasRequisicoes({
      message: "Entrada de dízimo não encontrada",
      status: 404,
      express: express,
    });
  }

  const entrada = await PegarEntradaDizimo(dados.id);

  return RespostasDasRequisicoes({
    message: "Entrada de dízimo encontrada",
    status: 200,
    data: entrada,
    express: express,
  });
}
