const Empresa = require('../models/EmpresaModel');

module.exports = {
  async criarEmpresa(req, res) {
    try {
      const novaEmpresa = await Empresa.create(req.body);
      return res.status(201).json(novaEmpresa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar empresa' });
    }
  },
  async listarEmpresas(req, res) {
    try {
      const empresas = await Empresa.findAll();
      return res.status(200).json(empresas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar empresas' });
    }
  },
  async procurarEmpresaPeloID(req, res) {
    try {
      const empresa = await Empresa.findByPk(req.params.id);
      if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
      return res.status(200).json(empresa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar empresa' });
    }
  },
  async atualizarEmpresa(req, res) {
    try {
      const [atualizou] = await Empresa.update(req.body, { where: { id: req.params.id } });
      if (!atualizou) return res.status(404).json({ error: 'Empresa não encontrada' });
      return res.status(200).json({ message: 'Empresa atualizada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar empresa' });
    }
  },
  async deletarEmpresa(req, res) {
    try {
      const deletou = await Empresa.destroy({ where: { id: req.params.id } });
      if (!deletou) return res.status(404).json({ error: 'Empresa não encontrada' });
      return res.status(200).json({ message: 'Empresa deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar empresa' });
    }
  },
};
