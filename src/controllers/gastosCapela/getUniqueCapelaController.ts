import { expressDTO } from "../../interfaces/expressDTO";
import { PegarGasto } from "../../services/database/IGastosCapelaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarGastoCapelaController(express: expressDTO) {
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

  const gasto = await PegarGasto(dados.id);

  return express.res.status(200).send({
    status: 200,
    message: "Gasto da capela encontrado",
    dados: gasto,
  });
}
