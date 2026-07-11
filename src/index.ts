import { config } from "dotenv";
import express from "express";

config();
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor Rodando Na Porta ${port}`);
});
