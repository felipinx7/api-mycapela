import { expressDTO } from "../../interfaces/expressDTO";
import { PegarGastos } from "../../services/database/IGastosCapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarGastosCapelaController(express: expressDTO) {
  const gastos = await PegarGastos();

  return RespostasDasRequisicoes({
    message: "Gastos da capela encontrados",
    status: 200,
    data: gastos,
    express: express,
  });
}
