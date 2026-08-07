import { expressDTO } from "../../interfaces/expressDTO";
import { PegarOfertorios } from "../../services/database/IOfertorioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function PegarOfertoriosController(express: expressDTO) {
  const ofertorios = await PegarOfertorios();

  return RespostasDasRequisicoes({
    status: 200,
    message: "Ofertórios encontrados",
    dados: ofertorios,
    express,
  });
}
