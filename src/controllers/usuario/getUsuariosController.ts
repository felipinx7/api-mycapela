import { expressDTO } from "../../interfaces/expressDTO";
import { PegarUsuarios } from "../../services/database/IUsuarioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarUsuariosController(express: expressDTO) {
  const usuarios = express.req.body;

  if (usuarios.TipoUsuario === "USUARIO") {
    return RespostasDasRequisicoes({
      status: 403,
      message: "Você não tem permissão para acessar",
      express,
    });
  }

  const todosUsuarios = await PegarUsuarios();

  return RespostasDasRequisicoes({
    status: 200,
    message: "Dados dos usuários",
    dados: todosUsuarios,
    express,
  });
}
