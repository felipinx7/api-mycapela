import { expressDTO } from "../../interfaces/expressDTO";
import { CriarCategoria } from "../../services/database/ICategoriaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaCategoria } from "../../utils/verificarExistenciaCategoria";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const capelaExistente = await VerificarExistenciaUsuario("capela", dadosCategoria.idCapela);
  const categoriaExistente = await VerificarExistenciaCategoria(dadosCategoria.nome);

  if (dadosCategoria.nome.length === 0 || dadosCategoria.idCapela.idCapela) {
    return RespostasDasRequisicoes({
      message: "Você precisar passar um nome pra categoria",
      status: 401,
      express: express,
    });
  }

  if (capelaExistente === false) {
    return RespostasDasRequisicoes({
      message: "Capela não encontrada",
      status: 404,
      express: express,
    });
  }

  if (categoriaExistente === true) {
    return RespostasDasRequisicoes({
      message: "Categoria já existente",
      status: 409,
      express: express,
    });
  }

  await CriarCategoria(dadosCategoria, dadosCategoria.idCapela);
  return RespostasDasRequisicoes({
    message: "Categoria criada com sucesso",
    status: 200,
    data: dadosCategoria,
    express: express,
  });
}
