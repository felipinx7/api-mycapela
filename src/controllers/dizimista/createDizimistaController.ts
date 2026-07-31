import { expressDTO } from "../../interfaces/expressDTO";
import { CriarDizimista } from "../../services/database/IDizimistaRepository";
import { VerificarExistenciaDizimistaPorNome } from "../../utils/verificarExistenciaDizimistaPorNome";
import { VerificarExistenciaUsuario } from "../../utils/verificarExistenciaUsuario";

export async function CriarDizimistaController(express: expressDTO) {
  const dadosDizimistas = express.req.body;
  const capelaExistente = await VerificarExistenciaUsuario("capela", dadosDizimistas.idCapela);
  const usuarioExistente = await VerificarExistenciaDizimistaPorNome(dadosDizimistas.nome);

  if (dadosDizimistas.nome.length === 0) {
    return express.res.status(401).send({
      status: 401,
      message: "É necessário informar um nome válido.",
    });
  }

  if (dadosDizimistas.tipoUsuario === "USUARIO") {
    return express.res.status(403).send({
      status: 403,
      message: "O tipo de usuário informado não é permitido para esta operação.",
    });
  }

  if (capelaExistente === false) {
    return express.res.status(404).send({
      status: 404,
      message: "o ID da capela informada não foi encontrada.",
    });
  }

  if (usuarioExistente === true) {
    return express.res.status(409).send({
      status: 409,
      message: "Dizimista já cadastrado",
    });
  }

  await CriarDizimista(dadosDizimistas, dadosDizimistas.idCapela);
  return express.res.status(200).send({
    status: 200,
    message: "Dizimista criado com sucesso",
  });
}
