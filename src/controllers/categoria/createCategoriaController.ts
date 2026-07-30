import { expressDTO } from "../../interfaces/expressDTO";
import { CriarCategoria } from "../../services/database/ICategoriaRepository";
import { VerificarExistenciaCategoria } from "../../utils/verificarExistenciaCategoria";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const capelaExistente = await VerificarExistenciaUsuario("capela", dadosCategoria.idCapela);
  const categoriaExistente = await VerificarExistenciaCategoria(dadosCategoria.nome);

  if (dadosCategoria.nome.length === 0 || dadosCategoria.idCapela.idCapela) {
    return express.res.status(401).send({
      status: 401,
      message: "Você precisar passar um nome pra categoria",
    });
  }

  if (capelaExistente === false) {
    return express.res.status(404).send({
      status: 404,
      message: "Capela não encontrada",
    });
  }

  if (categoriaExistente === true) {
    return express.res.status(409).send({
      status: 409,
      message: "Categoria já existente",
    });
  }

  await CriarCategoria(dadosCategoria, dadosCategoria.idCapela);
  return express.res.status(200).send({
    status: 200,
    message: "Categoria criada com sucesso",
    dados: dadosCategoria,
  });
}
