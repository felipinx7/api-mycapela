import { expressDTO } from "../../interfaces/expressDTO";
import { PegarDizimistas } from "../../services/database/IDizimistaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarDizimistasController(express: expressDTO) {
  const dados = express.req.body;

  const dizimistas = await PegarDizimistas();
  return RespostasDasRequisicoes({
    message: "dizimistas encontrados",
    status: 200,
    data: dizimistas,
    express: express,
  });
}
