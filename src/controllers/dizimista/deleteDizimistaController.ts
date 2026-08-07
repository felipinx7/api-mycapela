import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarDizimista } from "../../services/database/IDizimistaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarDizimistaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || dados.id.length === 0) {
    return RespostasDasRequisicoes({
      message: "você precisa informar um ID",
      status: 400,
      express: express,
    });
  }

  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.id);

  if (!dizimistaExistente) {
    return RespostasDasRequisicoes({
      message: "Dizimista não encontrado",
      status: 404,
      express: express,
    });
  }

  await DeletarDizimista(dados.id);

  return RespostasDasRequisicoes({
    message: "Dizimista deletado com sucesso",
    status: 200,
    express: express,
  });
}
