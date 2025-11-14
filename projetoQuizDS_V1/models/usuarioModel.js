const connection = require("../config/db")


const usuarioModel = {
    //função regististrar usuario
    criarUsuario: async (usuario) => {
        return await (await connection).execute(
            "CALL InsertUsuario(?, ?, ?)",
            [usuario.login, usuario.email, usuario.senha]
        );

    },

    //função para login usando procedures
    login: async (email, senha) => {
        const conn = await connection;
        const [result] = await conn.execute("CALL Verificar_Se_Email_e_Senha_Batem(?, ?)", [email, senha]);

        const usuario = result?.[0]?.[0];
        return usuario || null;
    },

    //Função adicionar pontos usando a procedure do banco
    adicionarPontos: async (usuarioId) => {
        await (await connection).execute(
            "CALL AtualizarPontuacaoUsuario(?)",
            [usuarioId]
        );
        console.log(`Pontuação atual: ${usuarioId}`);
    },

    // procedure verifica se o email existe
    verificarEmailExistente: async (email) => {
        const [rows] = await (await connection).execute(
            "CALL Verificar_Email_Existente(?)",
            [email]
        );
        return rows[0][0]?.existe > 0;
    },

    pegarUsuarioPeloEmail: async (email) => {
        const conn = await connection;
        const [result] = await conn.execute("CALL BuscarUsuarioPorEmail(?)", [email]);

        const usuario = result?.[0]?.[0];
        return usuario || null;
    },

    //adicionado novo metodo

    atualizarPontos: async (pontos,id) => {
        return (await connection).execute("update usuario set pontuacao = ? where id = ?", [pontos,id])
    }


}

module.exports = usuarioModel

