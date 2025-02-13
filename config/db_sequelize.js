const Sequelize = require('sequelize');
const sequelize = new Sequelize('trabalho_dois_web', 'postgres', '1', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5433
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);

db.Cliente = require('../models/cliente.js')(sequelize, Sequelize);

db.Quarto = require('../models/quarto.js')(sequelize, Sequelize);
module.exports = db;

