const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// QueryParams: request.query (Filtros, ordenacao, paginacao.....)
// RouteParams: request.params (Identificar um recurso na alteracao ou remocao)
// Body: request.body (Dados para criacao ou alteracao de um registro)

// MongoDB (Não-relacional)

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.get("/search", SearchController.index);

module.exports = routes;
