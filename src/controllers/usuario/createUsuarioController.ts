import bcrypt from "bcrypt";
import { randomInt } from "node:crypto";
import { expressDTO } from "../../interfaces/expressDTO";
import { CriarUsuario } from "../../services/database/IUsuarioRepository";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarUsuarioController(express: expressDTO) {
  const dadosUsuario = express.req.body;

  if (
    !dadosUsuario.TipoUsuario ||
    !dadosUsuario.email ||
    !dadosUsuario.nome ||
    !dadosUsuario.senha
  ) {
    return express.res.status(401).send({
      status: 401,
      message: "Você precisa preencher todos os daods",
    });
  }

  if (!dadosUsuario.idCapela) {
    return express.res.status(404).send({
      status: 404,
      message: "você precisar passar o ID da capela",
    });
  }

  const capelaExiste = await VerificarExistenciaUsuario(
    "capela",
    dadosUsuario.idCapela,
  );

  if (!capelaExiste) {
    return express.res.status(404).send({
      status: 404,
      message: "Capela não encontrada",
    });
  }

  const emailExistente = await VerificarExistenciaEmail(
    "usuario",
    dadosUsuario.email,
  );

  if (emailExistente) {
    return express.res.status(409).send({
      status: 409,
      message: "Email já cadastrado",
    });
  }

  if (
    dadosUsuario.TipoUsuario !== "ADMINISTRADOR" &&
    dadosUsuario.TipoUsuario !== "USUARIO"
  ) {
    return express.res.status(500).send({
      status: 500,
      message: "Tipo de usuário inválido",
    });
  }

  const saltHash = randomInt(10, 16);
  const senhaHash = await bcrypt.hash(dadosUsuario.senha, saltHash);

  await CriarUsuario(dadosUsuario, dadosUsuario.idCapela, senhaHash);
  return express.res.status(201).send({
    status: 201,
    message: "Usuario criado com sucesso",
    data: dadosUsuario,
  });
}
