import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarOfertorio } from "../../services/database/IOfertorioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarOfertorioController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id) {
    return RespostasDasRequisicoes({
      status: 400,
      message: "Você precisa informar um ID",
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

  await DeletarOfertorio(dados.id);

  return RespostasDasRequisicoes({
    status: 200,
    message: "Ofertório deletado com sucesso",
    express,
  });
}
