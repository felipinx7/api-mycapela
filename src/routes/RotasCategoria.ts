import { Router } from "express";
import { CriarCategoriaController } from "../controllers/categoria/createCategoriaController";
import { AtualizarCategoriaController } from "../controllers/categoria/updateCategoriaController";
import { PegarCategoriaController } from "../controllers/categoria/getUniqueCategoriaController";
import { PegarCategoriasController } from "../controllers/categoria/getCategoriaController";
import { DeletarCategoriaController } from "../controllers/categoria/deleteCategoriaController";

export const RotasCategorias = Router();

RotasCategorias.post("/criar", async (req, res) => await CriarCategoriaController({ req, res }));
RotasCategorias.put("/atualizar", async (req, res) => await AtualizarCategoriaController({ req, res }));
RotasCategorias.get("/pegar", async (req, res) => await PegarCategoriaController({ req, res }));
RotasCategorias.get("/pegar-todas", async (req, res) => await PegarCategoriasController({ req, res }));
RotasCategorias.delete("/deletar", async (req, res) => await DeletarCategoriaController({ req, res }));
