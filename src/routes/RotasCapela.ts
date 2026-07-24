import { routes } from "../config/rotas";
import { CriarCapelaController } from "../controllers/capela/createCapelaController";
import { DeleteCapelaController } from "../controllers/capela/deleteCapelaController";
import { PegarCapelasController } from "../controllers/capela/getCapelasController";
import { PegarUnicaCapelaController } from "../controllers/capela/getUniqueCapelaController";
import { AtualizarCapelaController } from "../controllers/capela/updateCapelaController";

export const routerCapela = routes;
routerCapela.post(
  "/criar",
  async (req, res) => await CriarCapelaController({ req, res }),
);
routerCapela.delete(
  "/deletar",
  async (req, res) => await DeleteCapelaController({ req, res }),
);

routerCapela.get(
  "/pegar",
  async (req, res) => await PegarUnicaCapelaController({ req, res }),
);

routerCapela.get(
  "/pegar-todas",
  async (req, res) => await PegarCapelasController({ req, res }),
);

routerCapela.put(
  "/atualizar",
  async (req, res) => await AtualizarCapelaController({ req, res }),
);
