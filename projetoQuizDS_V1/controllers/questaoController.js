const questaoModel = require('../models/questoesModel')

const questaoController = {
    // POST - criar questao
    criarQuestao: async (req, res) => {
        try {
            const questao = req.body;
            await questaoModel.criarQuestao(questao);
            res.status(201).json({ message: 'Questão inserida com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // PUT - atualizar questao
    atualizarQuestao: async (req, res) => {
        try {
            const questao = { ...req.body, id: req.params.id };
            await questaoModel.atualizarQuestao(questao);
            res.status(200).json({ message: 'Questão atualizada com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // DELETE - deletar questao
    deletarQuestao: async (req, res) => {
        try {
            await questaoModel.deletarQuestao(req.params.id);
            res.status(200).json({ message: 'Questão excluída com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    //adicionado novo metodo

    findQuestoesByDiscipinaId: async (req, res) => {
        const { id } = req.params

        if(!id) return res.status(400).json({message: "deu erro ai"})

        try{

            const result = await questaoModel.findQuestoesByDiscipinaId(id)

            res.status(200).json(result)
        }catch(err){
            res.status(400).json({message: "deu erro ai"})
            console.log("deu erro ai", err)
        }
    }
};

module.exports = questaoController;

