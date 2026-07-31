import { expressDTO } from "../../interfaces/expressDTO";
import { PegarDizimista } from "../../services/database/IDizimistaRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function PegarDizimistaController(express: expressDTO) {
  const dados = express.req.body;
  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.id);

  if (dados.id.length === 0) {
    return express.res.status(400).send({
      status: 400,
      message: "você precisa informar um ID",
    });
  }

  if (dizimistaExistente === false) {
    return express.res.status(404).send({
      status: 404,
      message: "usuário não econtrado",
    });
  }
  const dadosDizimista = await PegarDizimista(dados.id);

  return express.res.status(200).send({
    status: 200,
    message: "Dizimista econtrado",
    dados: dadosDizimista,
  });
}
