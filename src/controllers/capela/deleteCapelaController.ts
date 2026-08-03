import { expressDTO } from "../../interfaces/expressDTO";
import { DeleteCapela } from "../../services/database/ICapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeleteCapelaController(express: expressDTO) {
  const capela = express.req.body;

  if (!capela.id)
    return RespostasDasRequisicoes({
      message: "É necessário informar um identificador ID",
      status: 400,
      express: express,
    });

  const capelaNaoExiste = await VerificarExistenciaUsuario("capela", capela.id);

  if (capelaNaoExiste) {
    return RespostasDasRequisicoes({
      message: "Não foi possível encontrar a capela.",
      status: 404,
      express: express,
    });
  }

  await DeleteCapela(capela.id);
  return RespostasDasRequisicoes({
    message: "Capela excluída com sucesso.",
    status: 200,
    express: express,
  });
}
