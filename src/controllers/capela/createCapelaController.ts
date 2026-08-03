import { hash } from "bcrypt";
import { randomInt } from "node:crypto";
import { expressDTO } from "../../interfaces/expressDTO";
import { CapelaDTO } from "../../schemas/CapelaSchema";
import { CriarCapela } from "../../services/database/ICapelaRepository";
import { RespstaDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";

export async function CriarCapelaController(express: expressDTO) {
  const dados: CapelaDTO = express.req.body;

  if (!dados.email || !dados.nome || !dados.senha) {
    return RespstaDasRequisicoes({
      message: "Você precisar preeencher todos os campos!!",
      status: 409,
      express: express,
    });
  }

  const emailExistente = await VerificarExistenciaEmail("capela", dados.email);

  if (emailExistente) {
    return express.res.status(409).send({
      status: 409,
      message: "Email já cadastrado",
    });
  }

  const saltHash = randomInt(10, 16);
  const senhaHash = await hash(dados.senha, saltHash);

  await CriarCapela(dados, senhaHash);

  return express.res.status(201).send({
    status: 201,
    message: "Capela criada com sucesso",
  });
}
