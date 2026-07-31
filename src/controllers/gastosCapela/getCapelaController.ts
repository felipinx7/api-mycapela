import { expressDTO } from "../../interfaces/expressDTO";
import { PegarGastos } from "../../services/database/IGastosCapelaRepository";

export async function PegarGastosCapelaController(express: expressDTO) {
  const gastos = await PegarGastos();

  return express.res.status(200).send({
    status: 200,
    message: "Gastos da capela encontrados",
    dados: gastos,
  });
}
