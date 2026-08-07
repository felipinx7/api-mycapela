import { expressDTO } from "../../interfaces/expressDTO";
import { AtualizarDizimista } from "../../services/database/IDizimistaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaDizimistaPorNome } from "../../utils/verificarExistenciaDizimistaPorNome";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function AtualizarDizimistaController(express: expressDTO) {
  const dados = express.req.body;

  if (!dados.id || dados.id.length === 0 || !dados.nome || dados.nome.length === 0) {
    return RespostasDasRequisicoes({
      message: "Você precisa informar um ID e um nome válidos",
      status: 400,
      express: express,
    });
  }

  const dizimistaExistente = await VerificarExistenciaUsuario("dizimista", dados.id);
  const dizimistaCadastrado = await VerificarExistenciaDizimistaPorNome(dados.nome);

  if (dizimistaCadastrado === true) {
    return RespostasDasRequisicoes({
      message: "Dizimista já cadastrado",
      status: 403,
      express: express,
    });
  }

  if (!dizimistaExistente) {
    return RespostasDasRequisicoes({
      message: "Dizimista não encontrado",
      status: 404,
      express: express,
    });
  }

  await AtualizarDizimista(dados.id, dados);

  return RespostasDasRequisicoes({
    message: "Dizimista atualizado com sucesso",
    status: 200,
    express: express,
  });
}
