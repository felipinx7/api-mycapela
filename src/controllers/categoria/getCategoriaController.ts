import { expressDTO } from "../../interfaces/expressDTO";
import { PegarCategorias } from "../../services/database/ICategoriaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarCategoriasController(express: expressDTO) {
  const dadosCategoria = express.req.body;

  const categorias = await PegarCategorias();
  return RespostasDasRequisicoes({
    message: "Categorias encontradas",
    status: 200,
    data: categorias,
    express: express,
  });
}
