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
db.Receita = require('../models/receita.js')(sequelize, Sequelize);
db.Categoria = require('../models/categoria.js')(sequelize, Sequelize);
db.Categoria.hasMany(db.Receita, {foreignKey:'categoriaId', onDelete: 'NO ACTION'});
module.exports = db;

