import { expressDTO } from "../../interfaces/expressDTO";
import { PegarOfertorios } from "../../services/database/IOfertorioRepository";

export async function PegarOfertoriosController(express: expressDTO) {
  const ofertorios = await PegarOfertorios();

  return express.res.status(200).send({
    status: 200,
    message: "Ofertórios encontrados",
    dados: ofertorios,
  });
}
