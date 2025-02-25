const db = require('../config/db_sequelize');
const { Op } = require('sequelize');

module.exports = {
    async postQuarto(req, res) {
        try {
            const quarto = await db.Quarto.create(req.body);
            res.status(201).json(quarto);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar quarto' });
        }
    },

    async getQuartos(req, res) {
        try {
            const quartos = await db.Quarto.findAll();
            res.status(200).json(quartos);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar quartos' });
        }
    },

    async getQuartoById(req, res) {
        try {
            const quarto = await db.Quarto.findByPk(req.params.id);
            if (quarto) {
                res.status(200).json(quarto);
            } else {
                res.status(404).json({ error: 'Quarto não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao obter quarto' });
        }
    },

    async putQuarto(req, res) {
        try {
            const [updated] = await db.Quarto.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedQuarto = await db.Quarto.findByPk(req.params.id);
                res.status(200).json(updatedQuarto);
            } else {
                res.status(404).json({ error: 'Quarto não encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar quarto' });
        }
    },

    async deleteQuarto(req, res) {
        const transaction = await db.sequelize.transaction();
        try {
            const quartoId = req.params.id;

            const reservas = await db.Reserva.findAll({
                where: { quarto_id: quartoId },
                transaction
            });

            if (reservas.length > 0) {
                await db.Reserva.destroy({
                    where: { quarto_id: quartoId },
                    transaction
                });
            }
       
            const deleted = await db.Quarto.destroy({
                where: { id: quartoId },
                transaction
            });

            if (deleted) {
                await transaction.commit();
                res.status(204).json();
            } else {
                await transaction.rollback();
                res.status(404).json({ error: 'Quarto não encontrado' });
            }
        } catch (err) {
            await transaction.rollback();
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar quarto' });
        }
    }
};