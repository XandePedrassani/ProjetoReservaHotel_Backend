const db = require('../config/db_sequelize');

module.exports = {

    async postClienteReserva(req, res) {
        try {
            const clienteReserva = await db.ClienteReserva.create(req.body);
            res.status(201).json(clienteReserva);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao criar associação cliente-reserva' });
        }
    },

    async getClienteReservas(req, res) {
        try {
            const clienteReservas = await db.ClienteReserva.findAll();
            res.status(200).json(clienteReservas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar associações cliente-reserva' });
        }
    },

    async getClienteReservaById(req, res) {
        try {
            const clienteReserva = await db.ClienteReserva.findByPk(req.params.id);
            if (clienteReserva) {
                res.status(200).json(clienteReserva);
            } else {
                res.status(404).json({ error: 'Associação cliente-reserva não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao obter associação cliente-reserva' });
        }
    },

    async deleteClienteReserva(req, res) {
        try {
            const deleted = await db.ClienteReserva.destroy({
                where: { id: req.params.id } 
            });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Associação cliente-reserva não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar associação cliente-reserva' });
        }
    }
};