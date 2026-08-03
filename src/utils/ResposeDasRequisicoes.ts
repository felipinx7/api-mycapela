import { InterfaceDadosRespostaDasRequisicoes } from "../interfaces/InterfaceDadosRespostaDasRequisicoes";

export function RespostasDasRequisicoes({ message, status, data, express }: InterfaceDadosRespostaDasRequisicoes) {
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
