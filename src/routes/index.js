const { Router } = require('express');
const CultoController = require('../controllers/CultoController');

const routes = Router();

routes.get('/form/:diaCulto/:horario', CultoController.index);
routes.post('/form', CultoController.store);
routes.put('/form', CultoController.update);

module.exports = routes;
