module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true // Valida se é um e-mail válido
            }
        },
        telefone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        endereco: {
            type: Sequelize.STRING,
            allowNull: true
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [11, 11], // Garante exatamente 11 caracteres
                isNumeric: true // Garante que só tenha números
            }
        }
    }, {
        tableName: 'clientes', // Evita problemas com nomes de tabelas
        timestamps: false
    });

    Cliente.associate = (models) => {
        Cliente.belongsToMany(models.Reserva, {
            through: models.ClienteReserva,
            foreignKey: 'cliente_id', 
            otherKey: 'reserva_id',
            as: 'reservas'
        });
    };

    return Cliente;
};