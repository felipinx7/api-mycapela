import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarEntradaDizimoController(express: expressDTO) {
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

  await DeletarEntradaDizimo(dados.id);

  return RespostasDasRequisicoes({
    message: "Entrada de dízimo deletada com sucesso",
    status: 200,
    express: express,
  });
}
