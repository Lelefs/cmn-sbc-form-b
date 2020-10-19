const { Router } = require('express');
const CultoController = require('../controllers/CultoController');
const BemVindoController = require('../controllers/BemVindoController');

const routes = Router();

routes.get('/form/:diaCulto/:horario', CultoController.index);
routes.get('/form/contagem/:diaCulto/:horario', CultoController.contagem);
routes.post('/form', CultoController.store);
routes.put('/form', CultoController.update);

routes.get('/bemVindo', BemVindoController.index);
routes.get('/bemVindo/contagem', BemVindoController.contagem);
routes.post('/bemVindo', BemVindoController.store);

module.exports = routes;
