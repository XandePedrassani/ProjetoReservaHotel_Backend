const db = require('../config/db_sequelize');

module.exports = {
    async postReserva(req, res) {
        const transaction = await db.sequelize.transaction();
    
        try {
            const reserva = await db.Reserva.create(req.body, { transaction });
    
            let clientesIds = [];
    
            if (req.body.clientes) {
                if (Array.isArray(req.body.clientes)) {
                    clientesIds = req.body.clientes.map(Number);
                } else if (typeof req.body.clientes === 'string') {
                    clientesIds = req.body.clientes.split(',').map(Number);
                }
            }
    
            console.log("clientesIds:", clientesIds); 
    
            if (clientesIds.length > 0) {
                await reserva.setClientes(clientesIds, { transaction });
            }
    
            // Confirma a transação
            await transaction.commit();
    
            const reservaComClientes = await db.Reserva.findByPk(reserva.id, {
                include: [{ model: db.Cliente, as: 'clientes' }]
            });
    
            res.status(201).json(reservaComClientes);
        } catch (error) {
            //await transaction.rollback();
            console.error("Erro ao criar reserva:", error);
            res.status(500).json({ error: error.message });
        }
    },

    async getReservas(req, res) {
        try {
            const reservas = await db.Reserva.findAll({
                include: [
                    { model: db.Quarto },
                    { model: db.Cliente, through: { attributes: [] } }
                ]
            });
            res.status(200).json(reservas);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao listar reservas' });
        }
    },

    async getReservaById(req, res) {
        try {
            const reserva = await db.Reserva.findByPk(req.params.id, {
                include: [
                    { model: db.Quarto },
                    { model: db.Cliente, through: { attributes: [] } }
                ]
            });
            if (reserva) {
                res.status(200).json(reserva);
            } else {
                res.status(404).json({ error: 'Reserva não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao obter reserva' });
        }
    },

    async putReserva(req, res) {
        try {
            const [updated] = await db.Reserva.update(req.body, {
                where: { id: req.params.id }
            });

            if (updated) {
                const reserva = await db.Reserva.findByPk(req.params.id);

                if (req.body.clientes && Array.isArray(req.body.clientes)) {
                    await reserva.setClientes(req.body.clientes);
                }
                const updatedReserva = await db.Reserva.findByPk(req.params.id, {
                    include: [
                        { model: db.Quarto },
                        { model: db.Cliente, through: { attributes: [] } }
                    ]
                });
                res.status(200).json(updatedReserva);
            } else {
                res.status(404).json({ error: 'Reserva não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao atualizar reserva' });
        }
    },

    async deleteReserva(req, res) {
        try {
            const deleted = await db.Reserva.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Reserva não encontrada' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao deletar reserva' });
        }
    }
};