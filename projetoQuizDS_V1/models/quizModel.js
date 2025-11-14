const connection = require("../config/db");

const quizModel = {

    criarQuiz: async (quiz) => {
        return (await connection).execute(
            "CALL InsertQuiz(?, ?, ?, ?, ?)",
            [
                quiz.data_quiz,
                quiz.curso_id,
                quiz.disciplina_id,
                quiz.usuario_id,
                quiz.pontuacao
            ]
        );
    },

    selecionarTodosQuiz: async () => {
        return (await connection).execute("CALL SelectQuiz()");
    },

    atualizarQuiz: async (quiz) => {
        return (await connection).execute(
            "CALL UpdateQuiz(?, ?, ?, ?, ?, ?)",
            [
                quiz.id,
                quiz.data_quiz,
                quiz.curso_id,
                quiz.disciplina_id,
                quiz.usuario_id,
                quiz.pontuacao
            ]
        );
    },

    deletarQuiz: async (id) => {
        return (await connection).execute(
            "CALL DeleteQuiz(?)",
            [id]
        );
    },

    consultarQuizPorCursoId: async (cursoId) => {
        const sql = "SELECT * FROM quiz WHERE curso_id = ?";
        return (await connection).execute(sql, [idCurso]);
    },

    getQuestoesEAlternativasPorDisciplina: async (idDisciplina) => {
        return (await connection).execute(
            "CALL GetQuestoesEAlternativasPorDisciplina(?)",
            [idDisciplina]
        );
    }
};

module.exports = quizModel;

