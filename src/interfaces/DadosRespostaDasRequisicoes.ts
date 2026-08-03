import { expressDTO } from "./expressDTO";

export interface InterfaceDadosRespostaDasRequisicoes {
  status: number;
  message: string;
  data?: any[];
  express?: expressDTO;
}
