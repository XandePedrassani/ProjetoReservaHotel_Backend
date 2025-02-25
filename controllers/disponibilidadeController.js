const db = require('../config/db_sequelize');
const { Op } = require('sequelize');

module.exports = {
  async getQuartosOcupados(req, res) {
    
    const dtInicioQuery = req.query.dtInicio ? new Date(req.query.dtInicio) : new Date();
    const dtSaidaQuery = req.query.dtSaida ? new Date(req.query.dtSaida) : new Date();

    try {
      
      //   Reserva.dtInicio < dtSaidaQuery AND Reserva.dtSaida > dtInicioQuery

      const reservas = await db.Reserva.findAll({
        where: {
          dtInicio: { [Op.lt]: dtSaidaQuery },
          dtSaida: { [Op.gt]: dtInicioQuery }
        },
        include: [
          { 
            model: db.Quarto,
          },
          {
            model: db.Cliente,
            as: 'clientes',
            through: { attributes: [] }
          }
        ]
      });

      const quartosOcupados = reservas.map(reserva => ({
        reservaId: reserva.id,
        quartoId: reserva.quarto.id,
        descricao: reserva.quarto.descricao,
       
        ocupantes: reserva.clientes ? reserva.clientes.length : 0,
        dtSaida: reserva.dtSaida
      }));

      res.status(200).json(quartosOcupados);
    } catch (error) {
      console.error("Erro ao buscar quartos ocupados:", error);
      res.status(500).json({ error: 'Erro ao buscar quartos ocupados' });
    }
  },

  async getQuartosDisponiveis(req, res) {
    
    const dtInicioQuery = req.query.dtInicio ? new Date(req.query.dtInicio) : new Date();
    const dtSaidaQuery = req.query.dtSaida ? new Date(req.query.dtSaida) : new Date();

    try {
      
      const reservas = await db.Reserva.findAll({
        where: {
          dtInicio: { [Op.lt]: dtSaidaQuery },
          dtSaida: { [Op.gt]: dtInicioQuery }
        },
        attributes: ['quarto_id']
      });

      // Quartos Ocupados 
      const quartosOcupadosIds = reservas.map(reserva => reserva.quarto_id);

      // Quartos que NÃO estão ocupados
      const quartosDisponiveis = await db.Quarto.findAll({
        where: {
          id: { [Op.notIn]: quartosOcupadosIds }
        }
      });

      const quartosDisponiveisFormatted = quartosDisponiveis.map(quarto => ({
        id: quarto.id,
        descricao: quarto.descricao,
        ocupantes: 0
      }));

      res.status(200).json(quartosDisponiveisFormatted);
    } catch (error) {
      console.error("Erro ao buscar quartos disponíveis:", error);
      res.status(500).json({ error: 'Erro ao buscar quartos disponíveis' });
    }
  }
};
