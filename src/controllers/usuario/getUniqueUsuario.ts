import { expressDTO } from "../../interfaces/expressDTO";
import { PegarUsuario } from "../../services/database/IUsuarioRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarUsuarioController(express: expressDTO) {
  const dadosUsuario = express.req.body;

  if (!dadosUsuario.id) {
    return express.res.status(404).send({
      status: 404,
      message: "você precisa informar um ID",
    });
  }

  if (dadosUsuario.TipoUsuario === "USUARIO") {
    return express.res.status(403).send({
      status: 403,
      message: "Você não tem permissão pra isso",
    });
  }

  const usuarioExistente = await VerificarExistenciaUsuario(
    "usuario",
    dadosUsuario.id,
  )

  if (!usuarioExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Usuário não encontrado",
    });
  }

  const dados = await PegarUsuario(dadosUsuario.id);

  return express.res.status(200).send({
    status: 200,
    message: "dados do usuario",
    data: dados,
  });
}
