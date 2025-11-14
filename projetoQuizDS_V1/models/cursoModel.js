const db = require('../config/db.js');


const cursoModel = {
    criarCurso: async (curso) => {
        const sql = 'CALL InsertCurso(?, ?)';
        const res = (await db).execute(sql, [curso.nome, curso.sigla]);
        return res;
    },

    selecionarTodosCurso: async () => {
        const conn = await db;
        const [rows] = await conn.execute("CALL SelectCurso()");
        return rows[0];
    },

    altualizarCurso: async (curso) => {
        const sql = 'CALL UpdateCurso(?, ?, ?)';
        const res = (await db).execute(sql, [curso.id, curso.nome, curso.sigla]);

        return res

    },

    deletarCurso: async (id) => {
        try {

            const sql = 'CALL DeleteCurso(?)'

            return (await db).execute(sql, [id])

        } catch (error) {
            console.error(error)
        }

    },


};

module.exports = cursoModel;
