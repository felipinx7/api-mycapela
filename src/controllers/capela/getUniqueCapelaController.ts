import { expressDTO } from "../../interfaces/expressDTO";
import { PegarUnicaCapela } from "../../services/database/ICapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarUnicaCapelaController(express: expressDTO) {
  const capela = express.req.body;

  if (!capela.id)
    return RespostasDasRequisicoes({
      message: "É necessário informar um identificador ID.",
      status: 400,
      express: express,
    });

  const capelaNaoExiste = await VerificarExistenciaUsuario("capela", capela.id);

  if (capelaNaoExiste) {
    return RespostasDasRequisicoes({
      message: "Não foi possível encontrar a capela.",
      status: 400,
      express: express,
    });
  }

  const dadosCapela = await PegarUnicaCapela(capela.id);

  return RespostasDasRequisicoes({
    message: "Capela Encontrada",
    status: 200,
    data: dadosCapela ,
    express: express,
  });
}
