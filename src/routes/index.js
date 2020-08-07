const { Router } = require('express');
const CultoController = require('../controllers/CultoController');
const CursoCasadosController = require('../controllers/CursoCasadosController');

const routes = Router();

routes.get('/form/:diaCulto/:horario', CultoController.index);
routes.get('/form/contagem/:diaCulto/:horario', CultoController.contagem);
routes.post('/form', CultoController.store);
routes.put('/form', CultoController.update);

routes.get('/cursoCasados', CursoCasadosController.index);
routes.get('/cursoCasados/all', CursoCasadosController.show);
routes.get('/cursoCasados/contagem', CursoCasadosController.contagem);
routes.post('/cursoCasados', CursoCasadosController.store);

module.exports = routes;
