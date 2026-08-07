import { expressDTO } from "../../interfaces/expressDTO";
import { PegarDizimista } from "../../services/database/IDizimistaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarDizimistaController(express: expressDTO) {
  const dados = express.req.body;
  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.id);

  if (dados.id.length === 0) {
    return RespostasDasRequisicoes({
      message: "você precisa informar um ID",
      status: 400,
      express: express,
    });
  }

  if (dizimistaExistente === false) {
    return RespostasDasRequisicoes({
      message: "usuário não econtrado",
      status: 404,
      express: express,
    });
  }
  const dadosDizimista = await PegarDizimista(dados.id);

  return RespostasDasRequisicoes({
    message: "Dizimista econtrado",
    status: 200,
    data: dadosDizimista,
    express: express,
  });
}
