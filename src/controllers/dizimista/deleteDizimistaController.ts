import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarDizimista } from "../../services/database/IDizimistaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarDizimistaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || dados.id.length === 0) {
    return express.res.status(400).send({
      status: 400,
      message: "você precisa informar um ID",
    });
  }

  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.id);

  if (!dizimistaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Dizimista não encontrado",
    });
  }

  await DeletarDizimista(dados.id);

  return express.res.status(200).send({
    status: 200,
    message: "Dizimista deletado com sucesso",
  });
}
