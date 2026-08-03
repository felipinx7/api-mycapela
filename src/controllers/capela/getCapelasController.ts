import { expressDTO } from "../../interfaces/expressDTO";
import { PegarCapelas } from "../../services/database/ICapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarCapelasController(express: expressDTO) {
  const dadosCapela = await PegarCapelas();

  return RespostasDasRequisicoes({
    message: "Capelas Encontrada",
    status: 200,
    data: dadosCapela,
    express: express,
  });
}
