import { TipoUsuario } from "../../../generated/prisma/enums";
import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarUsuario } from "../../services/database/IUsuarioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarUsuarioController(express: expressDTO) {
  const dadosAtualizar = express.req.body;

  console.log("Data for update: ", dadosAtualizar);

  if (!dadosAtualizar.nome && !dadosAtualizar.email && !dadosAtualizar.TipoUsuario) {
    return RespostasDasRequisicoes({
      status: 401,
      message: "você precisa preencher os dados",
      express,
    });
  }

  if (dadosAtualizar.email > 0) {
    const emailExistente = await VerificarExistenciaEmail("usuario", dadosAtualizar.email);

    if (emailExistente) {
      return RespostasDasRequisicoes({
        status: 401,
        message: "email já cadastrado",
        express,
      });
    }
  }

  const usuarioExistente = await VerificarExistenciaUsuario("usuario", dadosAtualizar.id);

  if (!usuarioExistente) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Usuário Não encontrado",
      express,
    });
  }

  if (!Object.values(TipoUsuario).includes(dadosAtualizar.tipoUsuario)) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Tipo de usuário inválido",
      express,
    });
  }

  await AtualizarUsuario(dadosAtualizar.id, dadosAtualizar);

  return RespostasDasRequisicoes({
    status: 200,
    message: "Usuário atualizado com sucesso",
    express,
  });
}
