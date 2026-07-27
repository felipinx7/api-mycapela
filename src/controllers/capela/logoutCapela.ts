import { expressDTO } from "../../interfaces/expressDTO";

export async function LogoutCapela(express: expressDTO) {
  const valorToken = express.req.cookies.token;

  if (valorToken.length === 0) {
    return express.res.status(401).send({
      status: 401,
      message: "Usuário não autenticado",
    });
  }

  express.res.clearCookie("token", {
    httpOnly: true,
    path: "/capela",
    sameSite: "strict",
  });

  return express.res.status(200).send({
    status: 200,
    message: "Logot realizado com sucesso",
  });
}
