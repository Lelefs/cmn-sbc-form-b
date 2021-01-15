const { Router } = require('express');
const CultoController = require('../controllers/CultoController');
const BemVindoController = require('../controllers/BemVindoController');
const StaffController = require('../controllers/StaffController');

const routes = Router();

routes.get('/form/:diaCulto/:horario', CultoController.index);
routes.get('/form/contagem/:diaCulto/:horario', CultoController.contagem);
routes.post('/form', CultoController.store);
routes.put('/form', CultoController.update);

routes.get('/bemVindo', BemVindoController.index);
routes.get('/bemVindo/contagem', BemVindoController.contagem);
routes.post('/bemVindo', BemVindoController.store);

routes.get('/staff', StaffController.index);
routes.get('/staff/all', StaffController.show);
routes.post('/staff', StaffController.store);

module.exports = routes;
