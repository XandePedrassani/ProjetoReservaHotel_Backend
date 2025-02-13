module.exports = (sequelize, Sequelize) => {
    const Quarto = sequelize.define('quarto', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        ocupacaoMaxima: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        ramal: {
            type: Sequelize.STRING,
            allowNull: true
        },
        descricao: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
    return Quarto;
};