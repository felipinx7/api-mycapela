import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarOfertorio } from "../../services/database/IOfertorioRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarOfertorioController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar um ID",
    });
  }

  const ofertorioExistente = await VerificarExistenciaUsuario("ofertorio", dados.id);

  if (!ofertorioExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Ofertório não encontrado",
    });
  }

  await DeletarOfertorio(dados.id);

  return express.res.status(200).send({
    status: 200,
    message: "Ofertório deletado com sucesso",
  });
}
