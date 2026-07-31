import { Router } from "express";
import { CriarOfertorioController } from "../controllers/ofertorio/createGastosCapelaController";
import { DeletarOfertorioController } from "../controllers/ofertorio/deleteGastosCapelaController";
import { PegarOfertoriosController } from "../controllers/ofertorio/getGastosCapelaController";
import { PegarOfertorioController } from "../controllers/ofertorio/getUniqueGastosCapelaController";
import { AtualizarOfertorioController } from "../controllers/ofertorio/updateGastosCapelaController";

export const RotasOfertorio = Router();

RotasOfertorio.post("/criar", async (req, res) => await CriarOfertorioController({ req, res }));
RotasOfertorio.get("/pegar", async (req, res) => await PegarOfertorioController({ req, res }));
RotasOfertorio.get("/pegar-todos", async (req, res) => await PegarOfertoriosController({ req, res }));
RotasOfertorio.put("/atualizar", async (req, res) => await AtualizarOfertorioController({ req, res }));
RotasOfertorio.delete("/deletar", async (req, res) => await DeletarOfertorioController({ req, res }));
