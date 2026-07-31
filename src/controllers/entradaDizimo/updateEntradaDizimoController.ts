import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarEntradaDizimo } from "../../services/database/IEntradaDizimoRepository";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarEntradaDizimoController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || !dados.valor || !dados.data) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar id, valor e data",
    });
  }

  const entradaExistente = await VerificarExistenciaUsuario("entradaDizimo", dados.id);

  if (!entradaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Entrada de dízimo não encontrada",
    });
  }

  await AtualizarEntradaDizimo(dados.id, dados);

  return express.res.status(200).send({
    status: 200,
    message: "Entrada de dízimo atualizada com sucesso",
  });
}
