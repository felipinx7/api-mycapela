import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarGasto } from "../../services/database/IGastosCapelaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarGastoCapelaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar um ID",
    });
  }

  const gastoExistente = await VerificarExistenciaUsuario("gastosCapela", dados.id);

  if (!gastoExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Gasto da capela não encontrado",
    });
  }

  await DeletarGasto(dados.id);

  return express.res.status(200).send({
    status: 200,
    message: "Gasto da capela deletado com sucesso",
  });
}
