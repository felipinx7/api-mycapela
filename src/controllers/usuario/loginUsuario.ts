import bcrypt from "bcrypt";
import "dotenv";
import jwt from "jsonwebtoken";
import { expressDTO } from "../../interfaces/expressDTO";
import { InterfaceLoginCapela } from "../../interfaces/interface-login";
import { PegarUsuarioPorEmail } from "../../services/database/IUsuarioRepository";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";

export async function LoginUsuario(express: expressDTO) {
  const dados: InterfaceLoginCapela = express.req.body;

  if (dados.email.length === 0 || dados.senha.length === 0) {
    return RespostasDasRequisicoes({
      status: 401,
      message: "você precisa preencher todos os campos",
      express,
    });
  }

  const emailExistente = await VerificarExistenciaEmail("usuario", dados.email);
  const dadosUsuario = await PegarUsuarioPorEmail(dados.email);

  if (!emailExistente) {
    return RespostasDasRequisicoes({
      status: 401,
      message: "As informações de login que você inseriu estão incorretas",
      express,
    });
  }

  const senhaHash = await bcrypt.compare(dados.senha, dadosUsuario?.senha as string);

  if (senhaHash === false) {
    return RespostasDasRequisicoes({
      status: 401,
      message: "As informações de login que você inseriu estão incorretas",
      express,
    });
  }

  const token = jwt.sign(dados, process.env.JWT_SECRET as string, {
    expiresIn: "5h",
  });

  express.res.cookie("token", token, {
    httpOnly: true,
    path: "/usuario",
    sameSite: "strict",
  });

  return RespostasDasRequisicoes({
    status: 200,
    message: "login realizado com sucesso",
    tipoUsuaria: dadosUsuario?.tipoUsuario,
    token: token,
    express,
  });
}
