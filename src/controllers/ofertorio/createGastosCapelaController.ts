import { expressDTO } from "../../interfaces/expressDTO";
import { CriarOfertorio } from "../../services/database/IOfertorioRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarOfertorioController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.idCapela || !dados.idUsuario || !dados.valor || !dados.data) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar idCapela, idUsuario, valor e data",
    });
  }

  const capelaExistente = await VerificarExistenciaUsuario("capela", dados.idCapela);

  if (!capelaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Capela não encontrada",
    });
  }

  const usuarioExistente = await VerificarExistenciaUsuario("usuario", dados.idUsuario);

  if (!usuarioExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Usuário não encontrado",
    });
  }

  await CriarOfertorio(dados, dados.idCapela, dados.idUsuario);

  return express.res.status(201).send({
    status: 201,
    message: "Ofertório criado com sucesso",
    dados,
  });
}
