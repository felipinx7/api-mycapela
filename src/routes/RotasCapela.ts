import { routes } from "../config/rotas";
import { CriarCapelaController } from "../controllers/capela/createCapelaController";


export const routerCapela = routes
routerCapela.post("/criar", async (req, res) => await CriarCapelaController({req, res}))   
