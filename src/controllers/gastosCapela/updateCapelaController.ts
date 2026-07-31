import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarGasto } from "../../services/database/IGastosCapelaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarGastoCapelaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || !dados.valor || !dados.data) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar id, valor e data",
    });
  }

  const gastoExistente = await VerificarExistenciaUsuario("gastosCapela", dados.id);

  if (!gastoExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Gasto da capela não encontrado",
    });
  }

  await AtualizarGasto(dados.id, dados);

  return express.res.status(200).send({
    status: 200,
    message: "Gasto da capela atualizado com sucesso",
  });
}
