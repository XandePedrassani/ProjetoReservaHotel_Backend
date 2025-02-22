module.exports = (sequelize, DataTypes) => {
  const ClienteReserva = sequelize.define('ClienteReserva', {
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clientes',
        key: 'id'
      },
      field: 'cliente_id'
    },
    reserva_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'reservas',
        key: 'id'
      },
      field: 'reserva_id'
    }
  }, {
    tableName: 'ClienteReserva',
    timestamps: false 
  });

  return ClienteReserva;
};