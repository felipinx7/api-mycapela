import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarGasto } from "../../services/database/IGastosCapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarGastoCapelaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || !dados.valor || !dados.data) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar id, valor e data",
      status: 400,
      express: express,
    });
  }

  const gastoExistente = await VerificarExistenciaUsuario("gastosCapela", dados.id);

  if (!gastoExistente) {
    return RespostasDasRequisicoes({
      message: "Gasto da capela não encontrado",
      status: 404,
      express: express,
    });
  }

  await AtualizarGasto(dados.id, dados);

  return RespostasDasRequisicoes({
    message: "Gasto da capela atualizado com sucesso",
    status: 200,
    express: express,
  });
}
