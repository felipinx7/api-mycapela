import bcrypt from "bcrypt";
import "dotenv";
import jwt from "jsonwebtoken";
import { expressDTO } from "../../interfaces/expressDTO";
import { InterfaceLoginCapela } from "../../interfaces/interface-login";
import { PegarUsuarioPorEmail } from "../../services/database/IUsuarioRepository";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";

export async function LoginUsuario(express: expressDTO) {
  const dados: InterfaceLoginCapela = express.req.body;

  if (dados.email.length === 0 || dados.senha.length === 0) {
    return express.res.status(401).send({
      status: 401,
      messsage: "você precisa preencher todos os campos",
    });
  }

  const emailExistente = await VerificarExistenciaEmail("usuario", dados.email);
  const dadosUsuario = await PegarUsuarioPorEmail(dados.email);

  if (!emailExistente) {
    return express.res.status(401).send({
      status: 401,
      message: "As informações de login que você inseriu estão incorretas",
    });
  }

  const senhaHash = await bcrypt.compare(
    dados.senha,
    dadosUsuario?.senha as string,
  );

  if (senhaHash === false) {
    return express.res.status(401).send({
      status: 401,
      message: "As informações de login que você inseriu estão incorretas",
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

  return express.res.status(200).send({
    status: 200,
    message: "login realizado com sucesso",
    tipoUsuaria: dadosUsuario?.tipoUsuario,
    token: token,
  });
}
