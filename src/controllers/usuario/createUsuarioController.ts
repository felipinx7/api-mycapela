import bcrypt from "bcrypt";
import { randomInt } from "node:crypto";
import { expressDTO } from "../../interfaces/expressDTO";
import { CriarUsuario } from "../../services/database/IUsuarioRepository";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function CriarUsuarioController(express: expressDTO) {
  const dadosUsuario = express.req.body;

  if (
    !dadosUsuario.TipoUsuario ||
    !dadosUsuario.email ||
    !dadosUsuario.nome ||
    !dadosUsuario.senha
  ) {
    return RespostasDasRequisicoes({
      status: 401,
      message: "Você precisa preencher todos os daods",
      express,
    });
  }

  if (!dadosUsuario.idCapela) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "você precisar passar o ID da capela",
      express,
    });
  }

  const capelaExiste = await VerificarExistenciaUsuario(
    "capela",
    dadosUsuario.idCapela,
  );

  if (!capelaExiste) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Capela não encontrada",
      express,
    });
  }

  const emailExistente = await VerificarExistenciaEmail(
    "usuario",
    dadosUsuario.email,
  );

  if (emailExistente) {
    return RespostasDasRequisicoes({
      status: 409,
      message: "Email já cadastrado",
      express,
    });
  }

  if (
    dadosUsuario.TipoUsuario !== "ADMINISTRADOR" &&
    dadosUsuario.TipoUsuario !== "USUARIO"
  ) {
    return RespostasDasRequisicoes({
      status: 500,
      message: "Tipo de usuário inválido",
      express,
    });
  }

  const saltHash = randomInt(10, 16);
  const senhaHash = await bcrypt.hash(dadosUsuario.senha, saltHash);

  await CriarUsuario(dadosUsuario, dadosUsuario.idCapela, senhaHash);
  return RespostasDasRequisicoes({
    status: 201,
    message: "Usuario criado com sucesso",
    data: dadosUsuario,
    express,
  });
}
