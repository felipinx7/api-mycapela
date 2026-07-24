import { expressDTO } from "../../interfaces/expressDTO";
import { PegarUnicaCapela } from "../../services/database/ICapelaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarUnicaCapelaController(express: expressDTO) {
  const capela = express.req.body;

  if (!capela.id)
    return express.res.status(400).send({
      status: 400,
      message: "É necessário informar um identificador ID.",
    });

  const capelaNaoExiste = await VerificarExistenciaUsuario("capela", capela.id);

  if (capelaNaoExiste) {
    return express.res.status(400).send({
      status: 400,
      message: "Não foi possível encontrar a capela.",
    });
  }

  const dadosCapela = await PegarUnicaCapela(capela.id);

  return express.res.status(200).send({
    status: 200,
    message: "Capela Encontrada",
    data: dadosCapela,
  });
}
