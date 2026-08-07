import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarCategoria } from "../../services/database/ICategoriaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaCategoria } from "../../utils/verificarExistenciaCategoria";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";

export async function AtualizarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const nomeCategoriaExistente = await VerificarExistenciaCategoria(dadosCategoria.nome);
  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dadosCategoria.id);

  if (dadosCategoria.nome.length === 0 || dadosCategoria.id.length.length === 0) {
    return RespostasDasRequisicoes({
      message: "você precisa passar um nome",
      status: 401,
      express: express,
    });
  }

  if (categoriaExistente === false) {
    return RespostasDasRequisicoes({
      message: "categoria não encontrada",
      status: 404,
      express: express,
    });
  }

  if (nomeCategoriaExistente === true) {
    return RespostasDasRequisicoes({
      message: "categoria já existente",
      status: 409,
      express: express,
    });
  }

  console.log("DADOS RECEBIDOS: ", dadosCategoria);
  await AtualizarCategoria(dadosCategoria.id, dadosCategoria);
  return RespostasDasRequisicoes({
    message: "categoria atualizada com sucesso",
    status: 200,
    express: express,
  });
}
