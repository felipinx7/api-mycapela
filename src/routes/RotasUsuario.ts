import { Router } from "express";
import { CriarUsuarioController } from "../controllers/usuario/createUsuarioController";
import { DeletarUsuarioController } from "../controllers/usuario/deleteUsuarioController";
import { PegarUsuarioController } from "../controllers/usuario/getUniqueUsuario";
import { PegarUsuariosController } from "../controllers/usuario/getUsuariosController";
import { LoginUsuario } from "../controllers/usuario/loginUsuario";
import { LogoutUsuario } from "../controllers/usuario/logoutUsuario";
import { AtualizarUsuarioController } from "../controllers/usuario/updateUsuarioController";

export const RotasUsuario = Router();

RotasUsuario.post("/criar", async (req, res) => await CriarUsuarioController({ req, res }));
RotasUsuario.delete("/deletar", async (req, res) => await DeletarUsuarioController({ req, res }));
RotasUsuario.get("/pegar", async (req, res) => await PegarUsuarioController({ req, res }));
RotasUsuario.get("/pegar-todas", async (req, res) => await PegarUsuariosController({ req, res }));
RotasUsuario.put("/atualizar", async (req, res) => await AtualizarUsuarioController({ req, res }));
RotasUsuario.post("/login", async (req, res) => await LoginUsuario({ req, res }));
RotasUsuario.post("/logout", async (req, res) => await LogoutUsuario({ req, res }));
