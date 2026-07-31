import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarOfertorio } from "../../services/database/IOfertorioRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarOfertorioController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || !dados.valor || !dados.data) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar id, valor e data",
    });
  }

  const ofertorioExistente = await VerificarExistenciaUsuario("ofertorio", dados.id);

  if (!ofertorioExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Ofertório não encontrado",
    });
  }

  await AtualizarOfertorio(dados.id, dados);

  return express.res.status(200).send({
    status: 200,
    message: "Ofertório atualizado com sucesso",
  });
}
