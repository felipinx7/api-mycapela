import { expressDTO } from "../../interfaces/expressDTO";
import { PegarOfertorio } from "../../services/database/IOfertorioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarOfertorioController(express: expressDTO) {
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

  const ofertorio = await PegarOfertorio(dados.id);

  return RespostasDasRequisicoes({
    status: 200,
    message: "Ofertório encontrado",
    dados: ofertorio,
    express,
  });
}
