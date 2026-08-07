import { expressDTO } from "../../interfaces/expressDTO";
import { PegarCategoria } from "../../services/database/ICategoriaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";

export async function PegarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dadosCategoria.id);

  if (dadosCategoria.id.length === 0) {
    return RespostasDasRequisicoes({
      message: "você precisar passar um ID",
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

  const dadosUsuario = await PegarCategoria(dadosCategoria.id);

  return RespostasDasRequisicoes({
    message: "Categoria econtrada",
    status: 200,
    data: dadosUsuario,
    express: express,
  });
}
