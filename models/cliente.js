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
            unique: true
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
                len: [11, 11]
            }
        }
    });
    return Cliente;
}
