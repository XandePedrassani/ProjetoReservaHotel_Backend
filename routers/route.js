const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const clienteController = require('../controllers/clienteController');
const quartoController = require('../controllers/quartoController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

const db = require('../config/db_sequelize');
/*db.sequelize.sync({force: true}).then(() => {
    console.log('{ force: true }');
});*/
//db.Usuario.create({login:'admin', senha:'1234', tipo:2});


router.post('/login', authController.login);

router.get('/usuarios', authenticateToken, userController.getUsers);
router.post('/usuarios', authenticateToken, userController.postUser);
router.get('/usuarios/:id', authenticateToken, userController.getUsersById);
router.put('/usuarios/:id', authenticateToken, userController.putUser);
router.delete('/usuarios/:id', authenticateToken, userController.deleteUser);

router.get('/clientes', authenticateToken, clienteController.getClientes);
router.post('/clientes', authenticateToken, clienteController.postCliente);
router.get('/clientes/:id', authenticateToken, clienteController.getClienteById);
router.put('/clientes/:id', authenticateToken, clienteController.putCliente);
router.delete('/clientes/:id', authenticateToken, clienteController.deleteCliente);

router.post('/quartos', quartoController.postQuarto);
router.get('/quartos', quartoController.getQuartos);
router.get('/quartos/:id', quartoController.getQuartoById);
router.put('/quartos/:id', quartoController.putQuarto);
router.delete('/quartos/:id', quartoController.deleteQuarto);

module.exports = router;
