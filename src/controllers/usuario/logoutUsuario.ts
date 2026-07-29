import { expressDTO } from "../../interfaces/expressDTO";

export async function LogoutUsuario(express: expressDTO) {
  const tokenUsuario = express.req.cookies.token;

  if (tokenUsuario === 0) {
    return express.res.status(404).send({
      status: 404,
      message: "Usuário não autenticado",
    });
  }

  express.res.clearCookie("token", {
    httpOnly: true,
    path: "/path",
    sameSite: "strict",
  });

  return express.res.status(200).send({
    status: 200,
    message: "Logout realizado com sucesso",
  });
}
