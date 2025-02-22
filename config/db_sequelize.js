const Sequelize = require('sequelize');
const sequelize = new Sequelize('trabalho_dois_web', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
  });

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa os modelos
db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.js')(sequelize, Sequelize);
db.Quarto = require('../models/quarto.js')(sequelize, Sequelize);
db.Reserva = require('../models/reserva.js')(sequelize, Sequelize);
db.ClienteReserva = require('../models/clienteReserva.js')(sequelize, Sequelize);

db.models = {
  Cliente: db.Cliente,
  Reserva: db.Reserva,
  ClienteReserva: db.ClienteReserva,
  Quarto: db.Quarto
};

// Defina as associações *após* importar os modelos, usando db.models
db.Cliente.associate(db.models);
db.Reserva.associate(db.models);

module.exports = db;