import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarDizimista } from "../../services/database/IDizimistaRepository";
import { VerificarExistenciaDizimistaPorNome } from "../../utils/verificarExistenciaDizimistaPorNome";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarDizimistaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || dados.id.length === 0 || !dados.nome || dados.nome.length === 0) {
    return express.res.status(400).send({
      status: 400,
      message: "Você precisa informar um ID e um nome válidos",
    });
  }

  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.id);
  const dizimistaCadastrado = await VerificarExistenciaDizimistaPorNome(dados.nome);

  if (dizimistaCadastrado === true) {
    return express.res.status(403).send({
      status: 403,
      message: "Dizimista já cadastrado",
    });
  }

  if (!dizimistaExistente) {
    return express.res.status(404).send({
      status: 404,
      message: "Dizimista não encontrado",
    });
  }

  await AtualizarDizimista(dados.id, dados);

  return express.res.status(200).send({
    status: 200,
    message: "Dizimista atualizado com sucesso",
  });
}
