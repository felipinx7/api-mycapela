import { expressDTO } from "../../interfaces/expressDTO";
import { RespostasDasRequisicoes } from "../../utils/ResposeDasRequisicoes";

export async function LogoutCapela(express: expressDTO) {
  const valorToken = express.req.cookies.token;

  if (valorToken.length === 0) {
    return RespostasDasRequisicoes({
      message: "Usuário não autenticado",
      status: 401,
      express: express,
    });
  }

  express.res.clearCookie("token", {
    httpOnly: true,
    path: "/capela",
    sameSite: "strict",
  });

  return RespostasDasRequisicoes({
    message: "Logot realizado com sucesso",
    status: 200,
    express: express,
  });
}
