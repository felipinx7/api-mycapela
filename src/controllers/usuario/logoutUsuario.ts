import { expressDTO } from "../../interfaces/expressDTO";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function LogoutUsuario(express: expressDTO) {
  const tokenUsuario = express.req.cookies.token;

  if (tokenUsuario === 0) {
    return RespostasDasRequisicoes({
      status: 404,
      message: "Usuário não autenticado",
      express,
    });
  }

  express.res.clearCookie("token", {
    httpOnly: true,
    path: "/path",
    sameSite: "strict",
  });

  return RespostasDasRequisicoes({
    status: 200,
    message: "Logout realizado com sucesso",
    express,
  });
}
