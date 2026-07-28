import { expressDTO } from "../../interfaces/expressDTO";
import { PegarUsuarios } from "../../services/database/IUsuarioRepository";

export async function PegarUsuariosController(express: expressDTO) {
  const usuarios = express.req.body;

  if (usuarios.TipoUsuario === "USUARIO") {
    return express.res.status(403).send({
      status: 403,
      message: "Você não tem permissão para acessar",
    });
  }

  const todosUsuarios = await PegarUsuarios();

  return express.res.status(200).send({
    status: 200,
    message: "Dados dos usuários",
    dados: todosUsuarios,
  });
}
