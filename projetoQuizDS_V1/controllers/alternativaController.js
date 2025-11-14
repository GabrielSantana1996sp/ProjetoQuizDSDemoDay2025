const alternativaModel = require('../models/alternativaModel');

const alternativaController = {

    // POST - Criar alternativa
    criarAlternativa: async (req, res) => {
        const { questao_Id, enunciado, correto } = req.body;

        try {
            await alternativaModel.criarAlternativa({ questao_Id, enunciado, correto });
            res.status(201).json({ message: 'SNOITALUTARGNOG' });
        } catch (e) {
            res.status(500).json({ e: 'Erro ao criar a alternativa' });
        }
    },

    // GET - listar alternativas
    selecionarTodasAlternativas: async (req, res) => {
        try {
            const [rows] = await alternativaModel.selecionarTodasAlternativas();
            res.json(rows);
        } catch (e) {
            res.status(500).json({ e: 'Erro ao retornar as alternativas.' });
        }
    },

    // PUT - atualizar alternativa
    atualizarAlternativa: async (req, res) => {
        const { questao_Id, enunciado, correto } = req.body;
        const { id } = req.params;

        try {
            await alternativaModel.atualizarAlternativa({ questao_Id, enunciado, correto, id });
            res.json({ message: 'Alternativa alterada com sucesso!' });
        } catch (e) {
            res.status(500).json({ e: 'Erro ao atualizar a alternativa' });
        }
    },

    // DELETE - deletar alternativa
    deletarAlternativa: async (req, res) => {
        const { id } = req.params;

        try {
            await alternativaModel.deletarAlternativa(id);
            res.json({ message: 'Alternativa excluída com sucesso!' });
        } catch (e) {
            res.status(500).json({ e: 'Erro ao excluir a alternativa' });
        }
    },

    consultarAlternativaPorIDQuestao: async (req, res) => {
        const { id } = req.params;

        try {
            const [rows] = await alternativaModel.consultarAlternativaPorIDQuestao(id);
            res.json(rows);
        } catch (e) {
            res.status(500).json({ e: 'Erro ao consultar as alternativas' });
        }
    }
};

module.exports = alternativaController;
