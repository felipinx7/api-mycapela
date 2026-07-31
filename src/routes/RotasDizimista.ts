import { Router } from "express";
import { CriarDizimistaController } from "../controllers/dizimista/createDizimistaController";
import { DeletarDizimistaController } from "../controllers/dizimista/deleteDizimistaController";
import { PegarDizimistasController } from "../controllers/dizimista/getDizimistaController";
import { PegarDizimistaController } from "../controllers/dizimista/getUniqueDizimistaController";
import { AtualizarDizimistaController } from "../controllers/dizimista/updateDizimistaController";

export const RotasDizimistas = Router();

RotasDizimistas.post("/criar", async (req, res) => await CriarDizimistaController({ req, res }));
RotasDizimistas.get("/pegar", async (req, res) => await PegarDizimistaController({ req, res }));
RotasDizimistas.get("/pegar-todos", async (req, res) => await PegarDizimistasController({ req, res }));
RotasDizimistas.delete("/deletar", async (req, res) => await DeletarDizimistaController({ req, res }));
RotasDizimistas.put("/atualizar", async (req, res) => await AtualizarDizimistaController({ req, res }));
