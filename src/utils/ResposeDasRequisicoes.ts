import { InterfaceDadosRespostaDasRequisicoes } from "../interfaces/DadosRespostaDasRequisicoes";

export function RespstaDasRequisicoes({ message, status, data, express }: InterfaceDadosRespostaDasRequisicoes) {
  if (data === undefined) {
    return express?.res.status(status).send({
      status: status,
      message: message,
    });
  } else {
    return express?.res.status(status).send({
      status: status,
      message: message,
      data: data,
    });
  }
}
