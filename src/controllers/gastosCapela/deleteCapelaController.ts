import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarGasto } from "../../services/database/IGastosCapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarGastoCapelaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar um ID",
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

  await DeletarGasto(dados.id);

  return RespostasDasRequisicoes({
    message: "Gasto da capela deletado com sucesso",
    status: 200,
    express: express,
  });
}
