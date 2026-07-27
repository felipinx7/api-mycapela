import { Router } from "express";
import { CriarUsuarioController } from "../controllers/usuario/createUsuarioController";

export const RotasUsuario = Router();

RotasUsuario.post(
  "/criar",
  async (req, res) => await CriarUsuarioController({ req, res }),
);
