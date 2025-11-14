const disciplinaModel = require("../models/disciplinaModel");

const disciplinaController = {

    // POST - Criar disciplina
    criarDisciplina: async (req, res) => {
        const { nome, curso_id, sigla } = req.body;
        try {
            await disciplinaModel.criarDisciplina({ nome, curso_id, sigla });
            res.status(201).json({ message: "Disciplina criada!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar disciplina." });
        }
    },

    // GET - Listar disciplinas
    selecionarTodasDisciplinas: async (req, res) => {
        try {
            const [rows] = await disciplinaModel.selecionarTodasDisciplinas();
            res.json(rows);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar" });
        }
    },

    // PUT - Atualizar disciplina
    atualizarDisciplina: async (req, res) => {
        const { id } = req.params;
        const { nome, curso_id, sigla } = req.body;
        try {
            await disciplinaModel.atualizarDisciplina({ id, nome, curso_id, sigla });
            res.json({ message: "Disciplina atualizada com sucesso!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar disciplina." });
        }
    },

    // DELETE - Deletar disciplina
    deletarDisciplina: async (req, res) => {
        const { id } = req.params;
        try {
            await disciplinaModel.deletarDisciplina(id);
            res.json({ message: "Disciplina excluída!" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao excluir disciplina." });
        }
    },

    //Consulta a disciplina pelo id do curso
    consultarDisciplinasPorCursoId: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID do curso é obrigatório.' });
        }

        try {
            const disciplinas = await disciplinaModel.consultarTodasDisciplinas();
            const filtradas = disciplinas.filter(d => d.curso_id == id);

            if (filtradas.length === 0) {
                return res.status(404).json({ error: 'Nenhuma disciplina encontrada para este curso.' });
            }

            res.status(200).json(filtradas);
        } catch (error) {
            console.error('Erro ao consultar disciplinas:', error);
            res.status(500).json({ error: 'Erro interno ao consultar disciplinas.' });
        }
    },

    // adicionado novos metodos

    consultaTodasDisciplinas: async (req, res) => {
        try{
            const result = await disciplinaModel.consultarTodasDisciplinas()
            res.status(200).json(result)
        }catch(err){
            res.status(400)
            console.error(err)
        }
    },

    findDisciplinaById: async (req, res) => {
        const { id } = req.params

        if(!id) return res.status(400)

        try {
            const [result] = await disciplinaModel.findDisciplinaById(id)
            res.status(200).json(result[0])
        } catch (error) {
            res.status(400).json({message: "erro"})
            console.error(error)            
        }
    }

};

module.exports = disciplinaController;
