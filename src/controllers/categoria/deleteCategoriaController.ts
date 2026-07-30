import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarCategoria } from "../../services/database/ICategoriaRepository";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";

export async function DeletarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dadosCategoria.id);

  if (dadosCategoria.id.length === 0) {
    return express.res.status(401).send({
      status: 401,
      message: "Você precisa fornecer um ID",
    });
  }

  if (categoriaExistente === false) {
    return express.res.status(404).send({
      status: 404,
      message: "Categoria Não encontrada",
    });
  }

  await DeletarCategoria(dadosCategoria.id);
  return express.res.status(200).send({
    status: 200,
    message: "Categoria deletada com sucesso",
  });
}
