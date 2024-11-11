const Obra = require('../models/ObraModel');

module.exports = {
  async criarObra(req, res) {
    try {
      const novaObra = await Obra.create(req.body);
      return res.status(201).json(novaObra);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar obra' });
    }
  },
  async listarObras(req, res) {
    try {
      const obras = await Obra.findAll();
      return res.status(200).json(obras);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar obras' });
    }
  },
  async procurarObraPeloID(req, res) {
    try {
      const obra = await Obra.findByPk(req.params.id);
      if (!obra) return res.status(404).json({ error: 'Obra não encontrada' });
      return res.status(200).json(obra);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar obra' });
    }
  },
  async atualizarObra(req, res) {
    try {
      const [atualizou] = await Obra.update(req.body, { where: { id: req.params.id } });
      if (!atualizou) return res.status(404).json({ error: 'Obra não encontrada' });
      return res.status(200).json({ message: 'Obra atualizada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar obra' });
    }
  },
  async deletarObra(req, res) {
    try {
      const deletou = await Obra.destroy({ where: { id: req.params.id } });
      if (!deletou) return res.status(404).json({ error: 'Obra não encontrada' });
      return res.status(200).json({ message: 'Obra deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar obra' });
    }
  },
};
