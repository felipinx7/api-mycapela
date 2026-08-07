import { expressDTO } from "../../interfaces/expressDTO";
import { CriarDizimista } from "../../services/database/IDizimistaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaDizimistaPorNome } from "../../utils/verificarExistenciaDizimistaPorNome";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarDizimistaController(express: expressDTO) {
  const dadosDizimistas = express.req.body;
  const capelaExistente = await VerificarExistenciaUsuario("capela", dadosDizimistas.idCapela);
  const usuarioExistente = await VerificarExistenciaDizimistaPorNome(dadosDizimistas.nome);

  if (dadosDizimistas.nome.length === 0) {
    return RespostasDasRequisicoes({
      message: "É necessário informar um nome válido.",
      status: 401,
      express: express,
    });
  }

  if (dadosDizimistas.tipoUsuario === "USUARIO") {
    return RespostasDasRequisicoes({
      message: "O tipo de usuário informado não é permitido para esta operação.",
      status: 403,
      express: express,
    });
  }

  if (capelaExistente === false) {
    return RespostasDasRequisicoes({
      message: "o ID da capela informada não foi encontrada.",
      status: 404,
      express: express,
    });
  }

  if (usuarioExistente === true) {
    return RespostasDasRequisicoes({
      message: "Dizimista já cadastrado",
      status: 409,
      express: express,
    });
  }

  await CriarDizimista(dadosDizimistas, dadosDizimistas.idCapela);
  return RespostasDasRequisicoes({
    message: "Dizimista criado com sucesso",
    status: 200,
    express: express,
  });
}
