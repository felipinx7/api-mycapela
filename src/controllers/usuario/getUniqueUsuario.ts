import { expressDTO } from "../../interfaces/expressDTO";
import { PegarUsuario } from "../../services/database/IUsuarioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarUsuarioController(express: expressDTO) {
  const dadosUsuario = express.req.body;

  if (!dadosUsuario.id) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "você precisa informar um ID",
      express,
    });
  }

  if (dadosUsuario.TipoUsuario === "USUARIO") {
    return RespostasDasRequisicoes({
      status: 403,
      message: "Você não tem permissão pra isso",
      express,
    });
  }

  const usuarioExistente = await VerificarExistenciaUsuario("usuario", dadosUsuario.id);

  if (!usuarioExistente) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Usuário não encontrado",
      express,
    });
  }

  const dados = await PegarUsuario(dadosUsuario.id);

  return RespostasDasRequisicoes({
    status: 200,
    message: "dados do usuario",
    data: dados,
    express,
  });
}
