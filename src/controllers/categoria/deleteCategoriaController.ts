import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarCategoria } from "../../services/database/ICategoriaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";

export async function DeletarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dadosCategoria.id);

  if (dadosCategoria.id.length === 0) {
    return RespostasDasRequisicoes({
      message: "Você precisa fornecer um ID",
      status: 401,
      express: express,
    });
  }

  if (categoriaExistente === false) {
    return RespostasDasRequisicoes({
      message: "Categoria Não encontrada",
      status: 404,
      express: express,
    });
  }

  await DeletarCategoria(dadosCategoria.id);
  return RespostasDasRequisicoes({
    message: "Categoria deletada com sucesso",
    status: 200,
    express: express,
  });
}
