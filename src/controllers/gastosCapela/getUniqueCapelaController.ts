import { expressDTO } from "../../interfaces/expressDTO";
import { PegarGasto } from "../../services/database/IGastosCapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarGastoCapelaController(express: expressDTO) {
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

  const gasto = await PegarGasto(dados.id);

  return RespostasDasRequisicoes({
    message: "Gasto da capela encontrado",
    status: 200,
    data: gasto,
    express: express,
  });
}
