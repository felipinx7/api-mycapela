import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarUsuario } from "../../services/database/IUsuarioRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarUsuarioController(express: expressDTO) {
  const usuario = express.req.body;

  if (!usuario.id) {
    return express.res.status(400).send({
      status: 400,
      message: "você precisa passar um ID",
    });
  }
  
  if (usuario.TipoUsuario === "USUARIO") {
    return express.res.status(403).send({
      status: 403,
      message: "você não tem permissão pra isso",
    });
  }

  const usuarioExistente = await VerificarExistenciaUsuario(
    "usuario",
    usuario.id,
  );

  if (!usuarioExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Usuário não encontrado",
    });
  }

  await DeletarUsuario(usuario.id);

  return express.res.status(200).send({
    status: 200,
    message: "usuário deletado com sucesso",
  });
}
