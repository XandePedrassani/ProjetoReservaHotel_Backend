module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define('reserva', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        dtInicio: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'dt_inicio'
        },
        dtSaida: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'dt_saida'
        },
        quarto_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'quartos',
                key: 'id'
            },
            field: 'quarto_id'
        }
    }, {
        tableName: 'reservas',
        timestamps: false
    });

    Reserva.associate = (models) => {
        Reserva.belongsTo(models.Quarto, { foreignKey: 'quarto_id' });
        Reserva.belongsToMany(models.Cliente, {
            through: models.ClienteReserva,
            foreignKey: 'reserva_id', 
            otherKey: 'cliente_id',
            as: 'clientes'
        });
    };

    return Reserva;
};