import { expressDTO } from "../../interfaces/expressDTO";
import { DeletarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function DeletarEntradaDizimoController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar um ID",
    });
  }

  const entradaExistente = await VerificarExistenciaUsuario("entradaDizimo", dados.id);

  if (!entradaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Entrada de dízimo não encontrada",
    });
  }

  await DeletarEntradaDizimo(dados.id);

  return express.res.status(200).send({
    status: 200,
    message: "Entrada de dízimo deletada com sucesso",
  });
}
