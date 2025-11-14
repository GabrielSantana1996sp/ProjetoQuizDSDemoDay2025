const quizModel = require("../models/quizModel");

const quizController = {

    // POST - criar quiz
    criarQuiz: async (req, res) => {
        const { data_quiz, curso_id, disciplina_id, usuario_id, pontuacao } = req.body;
        try {
            await quizModel.criarQuiz({ data_quiz, curso_id, disciplina_id, usuario_id, pontuacao });
            res.status(201).json({ message: "Quiz criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar quiz." });
        }
    },

    // GET - listar quiz
    selecionarTodosQuiz: async (req, res) => {
        try {
            const [rows] = await quizModel.selecionarTodosQuiz();
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar quizzes." });
        }
    },

    // PUT - atualizar quiz
    atualizarQuiz: async (req, res) => {
        const { id } = req.params;
        const { data_quiz, curso_id, disciplina_id, usuario_id, pontuacao } = req.body;
        try {
            await quizModel.atualizarQuiz({ id, data_quiz, curso_id, disciplina_id, usuario_id, pontuacao });
            res.json({ message: "Quiz atualizado com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar quiz." });
        }
    },

    // DELETE - deletar quiz
    deletarQuiz: async (req, res) => {
        const { id } = req.params;
        try {
            await quizModel.deletarQuiz(id);
            res.json({ message: "Quiz excluído com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir quiz." });
        }
    },


    getQuizzesPorCurso: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID do curso é obrigatório." });
        }

        try {
            const [rows] = await quizModel.consultarQuizPorIdCurso(id);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar quizzes por curso." });
        }
    },


    getQuestoesEAlternativas: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID da disciplina é obrigatório." });
        }

        try {
            const [rows] = await quizModel.getQuestoesEAlternativasPorDisciplina(id);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar questões e alternativas." });
        }
    }
};

module.exports = quizController;
