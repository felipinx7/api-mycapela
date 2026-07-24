import { expressDTO } from "../../interfaces/expressDTO";
import { PegarCapelas } from "../../services/database/ICapelaRepository";

export async function PegarCapelasController(express: expressDTO) {
  const dadosCapela = await PegarCapelas();

  return express.res.status(200).send({
    status: 200,
    message: "Capelas Encontrada",
    data: dadosCapela,
  });
}
