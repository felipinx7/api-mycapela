import { expressDTO } from "../../interfaces/expressDTO";
import { CriarGastoCapela } from "../../services/database/IGastosCapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarGastoCapelaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.idCapela || !dados.idCategoria || !dados.valor || !dados.data) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar idCapela, idCategoria, valor e data",
      status: 400,
      express: express,
    });
  }

  const capelaExistente = await VerificarExistenciaUsuario("capela", dados.idCapela);

  if (!capelaExistente) {
    return RespostasDasRequisicoes({
      message: "Capela não encontrada",
      status: 404,
      express: express,
    });
  }

  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dados.idCategoria);

  if (!categoriaExistente) {
    return RespostasDasRequisicoes({
      message: "Categoria não encontrada",
      status: 404,
      express: express,
    });
  }

  await CriarGastoCapela(dados, dados.idCategoria, dados.idCapela);

  return RespostasDasRequisicoes({
    message: "Gasto da capela criado com sucesso",
    status: 201,
    data: dados,
    express: express,
  });
}
