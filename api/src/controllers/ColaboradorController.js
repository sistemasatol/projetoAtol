const Colaborador = require('../models/ColaboradorModel');

module.exports = {
  async criarColaborador(req, res) {
    try {
      const novoColaborador = await Colaborador.create(req.body);
      return res.status(201).json(novoColaborador);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar colaborador' });
    }
  },
  async listarColaboradores(req, res) {
    try {
      const colaboradores = await Colaborador.findAll();
      return res.status(200).json(colaboradores);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar colaboradores' });
    }
  },
  async procurarColaboradorPeloID(req, res) {
    try {
      const colaborador = await Colaborador.findByPk(req.params.id);
      if (!colaborador) return res.status(404).json({ error: 'Colaborador não encontrado' });
      return res.status(200).json(colaborador);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar colaborador' });
    }
  },
  async atualizarColaborador(req, res) {
    try {
      const [atualizou] = await Colaborador.update(req.body, { where: { id: req.params.id } });
      if (!atualizou) return res.status(404).json({ error: 'Colaborador não encontrado' });
      return res.status(200).json({ message: 'Colaborador atualizado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar colaborador' });
    }
  },
  async deletarColaborador(req, res) {
    try {
      const deletou = await Colaborador.destroy({ where: { id: req.params.id } });
      if (!deletou) return res.status(404).json({ error: 'Colaborador não encontrado' });
      return res.status(200).json({ message: 'Colaborador deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar colaborador' });
    }
  },
};
