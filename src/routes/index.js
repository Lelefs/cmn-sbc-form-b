const { Router } = require('express');
const CultoController = require('../controllers/CultoController');
const BemVindoController = require('../controllers/BemVindoController');
const EscolaMinisterialController = require('../controllers/EscolaMinisterialController');
const StaffController = require('../controllers/StaffController');
const MulheresController = require('../controllers/MulheresController');

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

routes.get('/mulheres/all', MulheresController.show);
routes.get('/mulheres/contagem', MulheresController.contagem);
routes.post('/mulheres', MulheresController.store);
routes.put('/mulheres', MulheresController.update);

routes.get('/escolaministerial', EscolaMinisterialController.index);
routes.get('/escolaministerial/all', EscolaMinisterialController.show);
routes.post('/escolaministerial', EscolaMinisterialController.store);

module.exports = routes;
