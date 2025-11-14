const cursoModel = require('../models/cursoModel.js');

const cursoController = {

    // POST - Criar Curso
    criarCurso: async (req, res) => {
        try {
            const { nome, sigla } = req.body;
            if (!nome || !sigla) {
                return res.status(400).json({ error: 'Nome e sigla são obrigatórios.' });
            }

            const resposta = await cursoModel.criarCurso({ nome, sigla });
            res.status(201).json({ message: 'Curso criado com sucesso!', data: resposta });
        } catch (error) {
            console.error('Erro ao criar curso:', error);
            res.status(500).json({ error: 'Erro interno ao criar curso.' });
        }
    },

    // GET - listar curso
    selecionarTodosCurso: async (req, res) => {
        try {
            const cursos = await cursoModel.selecionarTodosCurso();
            res.status(200).json(cursos);
        } catch (error) {
            console.error("Erro ao consultar cursos:", error);
            res.status(500).json({ error: "Erro interno ao consultar cursos." });
        }
    },

    // PUT - atualizar curso
    atualizarCurso: async (req, res) => {
        try {
            const { id, nome, sigla } = req.body;
            if (!id || !nome || !sigla) {
                return res.status(400).json({ error: 'ID, nome e sigla são obrigatórios.' });
            }

            const resposta = await cursoModel.altualizarCurso({ id, nome, sigla });
            res.status(200).json({ message: 'Curso editado com sucesso!', data: resposta });
        } catch (error) {
            console.error('Erro ao editar curso:', error);
            res.status(500).json({ error: 'Erro interno ao editar curso.' });
        }
    },

    // DELETE - deletar curso
    deletarCurso: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID é obrigatório.' });
            }

            await cursoModel.deletarCurso(id);
            res.status(200).json({ message: 'Curso excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir curso:', error);
            res.status(500).json({ error: 'Erro interno ao excluir curso.' });
        }
    },

    consultarRegistrosPorNome: async (req, res) => {
        const { nome } = req.params;

        if (!nome) {
            return res.status(400).json({ error: "Nome é obrigatório." });
        }

        try {
            const cursos = await cursoModel.consultarTodosRegistros();
            const filtrado = cursos.find(c => c.nome.toLowerCase() === nome.toLowerCase());

            if (!filtrado) {
                return res.status(404).json({ error: "Curso não encontrado." });
            }

            res.status(200).json(filtrado);
        } catch (error) {
            console.error("Erro ao consultar curso por nome:", error);
            res.status(500).json({ error: "Erro interno ao consultar curso." });
        }
    }


}

module.exports = cursoController;
