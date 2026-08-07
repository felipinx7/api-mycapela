import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarEntradaDizimoController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || !dados.valor || !dados.data) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar id, valor e data",
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

  await AtualizarEntradaDizimo(dados.id, dados);

  return RespostasDasRequisicoes({
    message: "Entrada de dízimo atualizada com sucesso",
    status: 200,
    express: express,
  });
}
