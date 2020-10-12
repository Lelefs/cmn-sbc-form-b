const { Router } = require('express');
const CultoController = require('../controllers/CultoController');
const ComunaKidsController = require('../controllers/ComunaKidsController');
const BemVindoController = require('../controllers/BemVindoController');

const routes = Router();

routes.get('/form/:diaCulto/:horario', CultoController.index);
routes.get('/form/contagem/:diaCulto/:horario', CultoController.contagem);
routes.post('/form', CultoController.store);
routes.put('/form', CultoController.update);

routes.get('/bemVindo', BemVindoController.index);
routes.get('/bemVindo/contagem', BemVindoController.contagem);
routes.post('/bemVindo', BemVindoController.store);

routes.get('/comunaKids', ComunaKidsController.index);
routes.get('/comunaKids/contagem', ComunaKidsController.contagem);
routes.post('/comunaKids', ComunaKidsController.store);
routes.put('/comunaKids', ComunaKidsController.update);

module.exports = routes;
