import { hash } from "bcrypt";
import { randomInt } from "node:crypto";
import { expressDTO } from "../../interfaces/expressDTO";
import { CapelaDTO } from "../../schemas/CapelaSchema";
import { CriarCapela } from "../../services/database/ICapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";

export async function CriarCapelaController(express: expressDTO) {
  const dados: CapelaDTO = express.req.body;

  if (!dados.email || !dados.nome || !dados.senha) {
    return RespostasDasRequisicoes({
      message: "Você precisar preeencher todos os campos!!",
      status: 409,
      express: express,
    });
  }

  const emailExistente = await VerificarExistenciaEmail("capela", dados.email);

    if (emailExistente) {
      return RespostasDasRequisicoes({
        message: "Email já cadastrado",
        status: 409,
        express: express,
      });
    }

  const saltHash = randomInt(10, 16);
  const senhaHash = await hash(dados.senha, saltHash);

  await CriarCapela(dados, senhaHash);

    return RespostasDasRequisicoes({
      message: "Capela criada com sucesso",
      status: 201,
      data: dados,
      express: express,
    });
}
