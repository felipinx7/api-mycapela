import { expressDTO } from "../../interfaces/expressDTO";
import { PegarCategoria } from "../../services/database/ICategoriaRepository";
import { VerificarExistenciaCategoriaPorID } from "../../utils/verificarExistenciaCategoriaPorID";

export async function PegarCategoriaController(express: expressDTO) {
  const dadosCategoria = express.req.body;
  const categoriaExistente = await VerificarExistenciaCategoriaPorID(dadosCategoria.id);

  if (dadosCategoria.id.length === 0) {
    return express.res.status(401).send({
      status: 401,
      message: "você precisar passar um ID",
    });
  }

  if (categoriaExistente === false) {
    return express.res.status(404).send({
      status: 404,
      message: "categoria não encontrada",
    });
  }

  const dadosUsuario = await PegarCategoria(dadosCategoria.id);

  return express.res.status(200).send({
    status: 200,
    message: "Categoria econtrada",
    data: dadosUsuario,
  });
}
