import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarCategoria } from "../../services/database/ICategoriaRepository";
import { VerificarExistenciaCategoria } from "../../utils/verificarExistenciaCategoria";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";

export async function AtualizarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const nomeCategoriaExistente = await VerificarExistenciaCategoria(dadosCategoria.nome);
  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dadosCategoria.id);

  if (dadosCategoria.nome.length === 0 || dadosCategoria.id.length.length === 0) {
    return express.res.status(401).send({
      status: 401,
      message: "você precisa passar um nome",
    });
  }

  if (categoriaExistente === false) {
    return express.res.status(404).send({
      status: 404,
      messaage: "categoria não encontrada",
    });
  }

  if (nomeCategoriaExistente === true) {
    return express.res.status(409).send({
      status: 409,
      messaage: "categoria já existente",
    });
  }

  console.log("DADOS RECEBIDOS: ", dadosCategoria);
  await AtualizarCategoria(dadosCategoria.id, dadosCategoria);
  return express.res.status(200).send({
    status: 200,
    message: "categoria atualizada com sucesso",
  });
}
