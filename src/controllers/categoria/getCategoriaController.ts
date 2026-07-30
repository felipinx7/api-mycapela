import { expressDTO } from "../../interfaces/expressDTO";
import { PegarCategorias } from "../../services/database/ICategoriaRepository";

export async function PegarCategoriasController(express: expressDTO) {
  const dadosCategoria = express.req.body;

  const categorias = await PegarCategorias();
  return express.res.status(200).send({
    status: 200,
    message: "Categorias encontradas",
    data: categorias,
  });
}
