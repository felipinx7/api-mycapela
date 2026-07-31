import { Router } from "express";
import { CriarEntradaDizimoController } from "../controllers/entradaDizimo/createEntradaDizimoController";
import { DeletarEntradaDizimoController } from "../controllers/entradaDizimo/deleteEntradaDizimoController";
import { PegarEntradasDizimoController } from "../controllers/entradaDizimo/getEntradaDizimoController";
import { PegarEntradaDizimoController } from "../controllers/entradaDizimo/getUniqueEntradaDizimoController";
import { AtualizarEntradaDizimoController } from "../controllers/entradaDizimo/updateEntradaDizimoController";

export const RotasEntradaDizimo = Router();

RotasEntradaDizimo.post("/criar", async (req, res) => await CriarEntradaDizimoController({ req, res }));
RotasEntradaDizimo.get("/pegar", async (req, res) => await PegarEntradaDizimoController({ req, res }));
RotasEntradaDizimo.get("/pegar-todos", async (req, res) => await PegarEntradasDizimoController({ req, res }));
RotasEntradaDizimo.put("/atualizar", async (req, res) => await AtualizarEntradaDizimoController({ req, res }));
RotasEntradaDizimo.delete("/deletar", async (req, res) => await DeletarEntradaDizimoController({ req, res }));
