import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarOfertorio } from "../../services/database/IOfertorioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarOfertorioController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || !dados.valor || !dados.data) {
    return RespostasDasRequisicoes({
      status: 400,
      message: "Você precisa informar id, valor e data",
      express,
    });
  }

  const ofertorioExistente = await VerificarExistenciaUsuario("ofertorio", dados.id);

  if (!ofertorioExistente) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Ofertório não encontrado",
      express,
    });
  }

  await AtualizarOfertorio(dados.id, dados);

  return RespostasDasRequisicoes({
    status: 200,
    message: "Ofertório atualizado com sucesso",
    express,
  });
}
