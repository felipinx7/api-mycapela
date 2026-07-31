import { expressDTO } from "../../interfaces/expressDTO";
import { CriarGastoCapela } from "../../services/database/IGastosCapelaRepository";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarGastoCapelaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.idCapela || !dados.idCategoria || !dados.valor || !dados.data) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar idCapela, idCategoria, valor e data",
    });
  }

  const capelaExistente = await VerificarExistenciaUsuario("capela", dados.idCapela);

  if (!capelaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Capela não encontrada",
    });
  }

  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dados.idCategoria);

  if (!categoriaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Categoria não encontrada",
    });
  }

  await CriarGastoCapela(dados, dados.idCategoria, dados.idCapela);

  return express.res.status(201).send({
    status: 201,
    message: "Gasto da capela criado com sucesso",
    dados,
  });
}
