import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarCapela } from "../../services/database/ICapelaRepository";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarCapelaController(express: expressDTO) {
  const dadosAtualizados = express.req.body;

  if (!dadosAtualizados.email && !dadosAtualizados.nome) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa preencher todos os campos.",
    });
  }

  const capelaNaoExiste = await VerificarExistenciaUsuario(
    "capela",
    dadosAtualizados.id,
  );

  const emailExistente = await VerificarExistenciaEmail(
    "capela",
    dadosAtualizados.email,
  );

  if (capelaNaoExiste) {
    return express.res.status(404).send({
      status: 404,
      message: "Capela não foi encontrada",
    });
  }

  if (emailExistente) {
    return express.res.status(409).send({
      status: 409,
      message: "Email já cadastrado",
    });
  }

  await AtualizarCapela(dadosAtualizados, dadosAtualizados.id);
  return express.res.status(200).send({
    message: "Dados Atualizados com sucesso",
    data: dadosAtualizados,
  });
}
