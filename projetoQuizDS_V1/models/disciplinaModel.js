const connection = require("../config/db");


const disciplinaModel = {

    criarDisciplina: async (disciplina) => {
        return (await connection).execute(
            "CALL InsertDisciplina(?, ?, ?)",
            [disciplina.nome, disciplina.curso_id, disciplina.sigla]
        );
    },

    selecionarTodasDisciplinas: async () => {
        return (await connection).execute("CALL SelectDisciplina()");
    },

    atualizarDisciplina: async (disciplina) => {
        return (await connection).execute(
            "CALL UpdateDisciplina(?, ?, ?, ?)",
            [disciplina.id, disciplina.nome, disciplina.curso_id, disciplina.sigla]
        );
    },

    deletarDisciplina: async (id) => {
        return (await connection).execute("CALL DeleteDisciplina(?)", [id]);
    },
    
    consultarTodasDisciplinas: async () => {
        const conn = await connection;
        const [rows] = await conn.execute("CALL SelectDisciplina()");
        return rows[0];
    },

    //adicionado novo metodo
    findDisciplinaById: async (id) => {
        return (await connection).execute("select * from disciplina where id = ?", [id])
    }

};

module.exports = disciplinaModel;
