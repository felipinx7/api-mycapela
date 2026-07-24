import { ErrorServidor } from "../../interfaces/ErrosServidor";
import { expressDTO } from "../../interfaces/expressDTO";
import { DeleteCapela } from "../../services/database/ICapelaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeleteCapelaController(express: expressDTO) {
  const capela = express.req.body;

  if (!capela.id)
    return express.res.status(400).send({
      status: 400,
      message: "É necessário informar um identificador ID",
    });

  const capelaNaoExiste = await VerificarExistenciaUsuario("capela", capela.id);

  if (capelaNaoExiste) {
    return express.res.status(404).send({
      status: 404,
      message: "Não foi possível encontrar a capela.",
    });
  }

  await DeleteCapela(capela.id);
  return express.res.status(200).send({
    status: 200,
    message: "Capela excluída com sucesso.",
  });
}
