import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarUsuario } from "../../services/database/IUsuarioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarUsuarioController(express: expressDTO) {
  const usuario = express.req.body;

  if (!usuario.id) {
    return RespostasDasRequisicoes({
      status: 400,
      message: "você precisa passar um ID",
      express,
    });
  }

  if (usuario.TipoUsuario === "USUARIO") {
    return RespostasDasRequisicoes({
      status: 403,
      message: "você não tem permissão pra isso",
      express,
    });
  }

  const usuarioExistente = await VerificarExistenciaUsuario("usuario", usuario.id);

  if (!usuarioExistente) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Usuário não encontrado",
      express,
    });
  }

  await DeletarUsuario(usuario.id);

  return RespostasDasRequisicoes({
    status: 200,
    message: "usuário deletado com sucesso",
    express,
  });
}
