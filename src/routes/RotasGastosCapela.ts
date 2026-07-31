import { Router } from "express";
import { CriarGastoCapelaController } from "../controllers/gastosCapela/createCapelaController";
import { DeletarGastoCapelaController } from "../controllers/gastosCapela/deleteCapelaController";
import { PegarGastosCapelaController } from "../controllers/gastosCapela/getCapelaController";
import { PegarGastoCapelaController } from "../controllers/gastosCapela/getUniqueCapelaController";
import { AtualizarGastoCapelaController } from "../controllers/gastosCapela/updateCapelaController";

export const RotasGastosCapela = Router();

RotasGastosCapela.post("/criar", async (req, res) => await CriarGastoCapelaController({ req, res }));
RotasGastosCapela.get("/pegar", async (req, res) => await PegarGastoCapelaController({ req, res }));
RotasGastosCapela.get("/pegar-todos", async (req, res) => await PegarGastosCapelaController({ req, res }));
RotasGastosCapela.put("/atualizar", async (req, res) => await AtualizarGastoCapelaController({ req, res }));
RotasGastosCapela.delete("/deletar", async (req, res) => await DeletarGastoCapelaController({ req, res }));
