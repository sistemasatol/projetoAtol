const express = require('express');
const EmpresaController = require('./controllers/EmpresaController');
const ObraController = require('./controllers/ObraController');
const ColaboradorController = require('./controllers/ColaboradorController');
const FuncaoController = require('./controllers/FuncaoController');
const routes = express.Router();

// Rotas para Empresa
routes.post('/empresas', EmpresaController.criarEmpresa);
routes.get('/empresas', EmpresaController.listarEmpresas);
routes.get('/empresas/:id', EmpresaController.procurarEmpresaPeloID);
routes.put('/empresas/:id', EmpresaController.atualizarEmpresa);
routes.delete('/empresas/:id', EmpresaController.deletarEmpresa);

routes.post('/funcoes', FuncaoController.criarFuncao);
routes.get('/funcoes', FuncaoController.listarFuncoes);
routes.get('/funcoes/:id', FuncaoController.procurarFuncaoPeloID);
routes.put('/funcoes/:id', FuncaoController.update);
routes.delete('/funcoes/:id', FuncaoController.delete);

// Rotas para Obra
routes.post('/obras', ObraController.criarObra);
routes.get('/obras', ObraController.listarObras);
routes.get('/obras/:id', ObraController.procurarObraPeloID);
routes.put('/obras/:id', ObraController.atualizarObra);
routes.delete('/obras/:id', ObraController.deletarObra);

// Rotas para Colaborador
routes.post('/colaboradores', ColaboradorController.criarColaborador);
routes.get('/colaboradores', ColaboradorController.listarColaboradores);
routes.get('/colaboradores/:id', ColaboradorController.procurarColaboradorPeloID);
routes.put('/colaboradores/:id', ColaboradorController.atualizarColaborador);
routes.delete('/colaboradores/:id', ColaboradorController.deletarColaborador);

module.exports = routes;
