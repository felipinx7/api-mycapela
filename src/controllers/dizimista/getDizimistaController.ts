import { expressDTO } from "../../interfaces/expressDTO";
import { PegarDizimistas } from "../../services/database/IDizimistaRepository";

export async function PegarDizimistasController(express: expressDTO) {
  const dados = express.req.body;

  const dizimistas = await PegarDizimistas();
  return express.res.status(200).send({
    status: 200,
    message: "dizimistas encontrados",
    dados: dizimistas,
  });
}
