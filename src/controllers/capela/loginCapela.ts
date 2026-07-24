import bcrypt from "bcrypt";
import "dotenv";
import jwt from "jsonwebtoken";
import { expressDTO } from "../../interfaces/expressDTO";
import { InterfaceLoginCapela } from "../../interfaces/interface-login";
import { VerificarUsuarioLogado } from "../../middlewares/authMiddleware";
import { PegarCapelaPorEmail } from "../../services/database/ICapelaRepository";
import { VerificarExistenciaEmail } from "../../utils/verificarExistenciaEmail";

export async function LoginCapela(express: expressDTO) {
  const dados: InterfaceLoginCapela = express.req.body;

  if (!dados.email || !dados.senha) {
    return express.res.status(400).send({
      status: 400,
      message: "você precisar preencher os campos",
    });
  }

  const emailExistente = await VerificarExistenciaEmail("capela", dados.email);
  const dadosCapela = await PegarCapelaPorEmail(dados.email);

  if (!emailExistente) {
    return express.res.status(404).send({
      status: 400,
      message: "email inválido",
    });
  }

  const senhaValida = await bcrypt.compare(
    dados.senha,
    dadosCapela?.senha as string,
  );

  if (emailExistente === true && senhaValida === true) {
    const token = jwt.sign(
      { email: dados.email, senha: dados.senha },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" },
    );

    express.res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/capela",
    });

    console.log(await VerificarUsuarioLogado());
    return express.res.status(201).send({
      status: 200,
      message: "Login realizado com sucesso",
      data: token,
    });
  } else {
    express.res
      .status(401)
      .send({ status: 401, message: "Credenciais inválidas" });
  }
}
