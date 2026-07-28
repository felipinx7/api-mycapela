import { TipoUsuario } from "../../../generated/prisma/enums";
import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarUsuario } from "../../services/database/IUsuarioRepository";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarUsuarioController(express: expressDTO) {
  const dadosAtualizar = express.req.body;

  console.log("Data for update: ", dadosAtualizar);

  if (
    !dadosAtualizar.nome &&
    !dadosAtualizar.email &&
    !dadosAtualizar.TipoUsuario
  ) {
    return express.res.status(401).send({
      status: 401,
      message: "você precisa preencher os dados",
    });
  }

  if (dadosAtualizar.email > 0) {
    const emailExistente = await VerificarExistenciaEmail(
      "usuario",
      dadosAtualizar.email,
    );

    if (emailExistente) {
      return express.res.status(401).send({
        status: 401,
        message: "email já cadastrado",
      });
    }
  }

  const usuarioExistente = await VerificarExistenciaUsuario(
    "usuario",
    dadosAtualizar.id,
  );

  if (!usuarioExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Usuário Não encontrado",
    });
  }

  if (!Object.values(TipoUsuario).includes(dadosAtualizar.tipoUsuario)) {
    return express.res.status(404).send({
      status: 404,
      message: "Tipo de usuário inválido",
    });
  }

  await AtualizarUsuario(dadosAtualizar.id, dadosAtualizar);

  return express.res.status(200).send({
    status: 200,
    message: "Usuário atualizado com sucesso",
  });
}
