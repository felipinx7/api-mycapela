import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarCapela } from "../../services/database/ICapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarCapelaController(express: expressDTO) {
  const dadosAtualizados = express.req.body;

  if (!dadosAtualizados.email && !dadosAtualizados.nome) {
    return RespostasDasRequisicoes({
      message: "Você precisa preencher todos os campos.",
      status: 400,
      express: express,
    });
  }

  const capelaNaoExiste = await VerificarExistenciaUsuario("capela", dadosAtualizados.id);

  if (capelaNaoExiste) {
    return RespostasDasRequisicoes({
      message: "Capela não foi encontrada",
      status: 404,
      express: express,
    });
  }

  if (dadosAtualizados.email > 0) {
    const emailExistente = await VerificarExistenciaEmail("capela", dadosAtualizados.email);

    if (emailExistente) {
      return RespostasDasRequisicoes({
        message: "Email já cadastrado",
        status: 409,
        express: express,
      });
    }
  }

  await AtualizarCapela(dadosAtualizados, dadosAtualizados.id);
  return RespostasDasRequisicoes({
    message: "Dados Atualizados com sucesso",
    status: 200,
    data: dadosAtualizados,
    express: express,
  });
}
