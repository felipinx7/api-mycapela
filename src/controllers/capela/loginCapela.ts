import bcrypt from "bcrypt";
import "dotenv";
import jwt from "jsonwebtoken";
import { expressDTO } from "../../interfaces/expressDTO";
import { InterfaceLoginCapela } from "../../interfaces/interfaceLogin";
import { PegarCapelaPorEmail } from "../../services/database/ICapelaRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";

export async function LoginCapela(express: expressDTO) {
  const dados: InterfaceLoginCapela = express.req.body;

  if (!dados.email || !dados.senha) {
    return RespostasDasRequisicoes({
      message: "você precisar preencher os campos",
      status: 400,
      express: express,
    });
  }

  const emailExistente = await VerificarExistenciaEmail("capela", dados.email);
  const dadosCapela = await PegarCapelaPorEmail(dados.email);

  if (!emailExistente) {
    return RespostasDasRequisicoes({
      message: "email inválido",
      status: 404,
      express: express,
    });
  }

  const senhaValida = await bcrypt.compare(dados.senha, dadosCapela?.senha as string);

  if (emailExistente === true && senhaValida === true) {
    const token = jwt.sign({ email: dados.email, senha: dados.senha }, process.env.JWT_SECRET as string, { expiresIn: "2h" });

    express.res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/capela",
    });

    return RespostasDasRequisicoes({
      message: "Login realizado com sucesso",
      status: 200,
      data: { tipoUsuario: "CAPELA" },
      express: express,
    });
  } else {
    return RespostasDasRequisicoes({
      message: "Credenciais inválidas",
      status: 401,
      express: express,
    });
  }
}
