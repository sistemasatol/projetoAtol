const Funcao = require('../models/FuncaoModel');

module.exports = {
      async criarFuncao(req, res) {
            const dadosFuncao = req.body;
            try {
                  await Funcao.create(dadosFuncao);
                  return res.status(200).json("Função Criada com Sucesso");
            } catch (err) {
                  return res.status(500).json("Erro ao criar função");
            }
      },

      async procurarFuncaoPeloID(req, res) {
            try {
                  const funcao = await Funcao.findOne({ where: { id: req.params.id } });
                  return res.status(200).json(funcao);
            } catch (err) {
                  console.error("Erro na busca:", err);
                  return res.status(500).json("Erro ao procurar função pelo ID");
            }
      },

      async listarFuncoes(req, res) {
            try {
                  const funcoes = await Funcao.findAll();
                  return res.status(200).json(funcoes);
            } catch (err) {
                  console.error("Erro ao listar funções:", err);
                  return res.status(500).json("Erro ao listar funções");
            }
      },

      async update(req, res) {
            const funcao = req.body;
            const id = req.params.id;
            try {
                  await Funcao.update(funcao, { where: { id } });
                  return res.status(200).json({ msg: `Função ${funcao.nome} atualizada com sucesso!` });
            } catch (error) {
                  console.error("Erro na atualização:", error);
                  return res.status(500).json({ msg: `Função ${funcao.nome} não foi atualizada` });
            }
      },

      async delete(req, res) {
            try {
                  await Funcao.destroy({ where: { id: req.params.id } });
                  return res.status(200).json({ msg: `Exclusão de função com ID ${req.params.id} feita com sucesso!` });
            } catch (err) {
                  console.error("Erro na exclusão:", err);
                  return res.status(500).json("Erro ao excluir a função");
            }
      }
}