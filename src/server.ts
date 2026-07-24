import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { routerCapela } from "./routes/RotasCapela";

// variaveis de configurações.
export const app = express();
const port = process.env.PORT || 3000;

// Inicializando configurações do projeto.
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/capela/", routerCapela);

// Inicialização do servidor.
app.listen(port, () => {
  console.log(`Servidor Rodando Na Porta ${port}`);
});
