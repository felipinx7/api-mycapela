import { ErrorServidor } from "../../interfaces/ErrosServidor";
import { expressDTO } from "../../interfaces/expressDTO";
import { CapelaDTO } from "../../schemas/CapelaSchema";
import { CriarCapela } from "../../services/database/ICapelaRepository";

export async function CriarCapelaController(express: expressDTO) {
  const dados: CapelaDTO = express.req.body;

  if (!dados)
    throw new ErrorServidor("Você precisar preeencher todos os campos!!", 400);

  await CriarCapela(dados);
}
