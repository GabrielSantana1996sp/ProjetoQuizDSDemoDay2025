CREATE DATABASE projetoQuiz;
USE projetoQuiz;

#######TABELA DO USUÁRIO########

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha CHAR(64) NOT NULL, 
    pontuacao INT DEFAULT 0
);

########TABELA CURSO###########

CREATE TABLE curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL, 
    sigla VARCHAR(10)
);


#########TABELA DISCIPLINA############

CREATE TABLE disciplina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL, 
    curso_id INT,
    sigla VARCHAR(10),
    FOREIGN KEY (curso_id) REFERENCES curso(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

###########TABELA QUESTAO###########

CREATE TABLE questao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enunciado VARCHAR(255) NOT NULL,
    pontuacao INT,
    disciplina_id INT,
    FOREIGN KEY (disciplina_id) REFERENCES disciplina(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

############TABELA QUIZ############

CREATE TABLE quiz (
id INT AUTO_INCREMENT PRIMARY KEY,
data_quiz DATE NOT NULL,
curso_id INT,
disciplina_id INT,
usuario_id INT,
pontuacao int default 0,
idQuestao01 INT,
idQuestao02 INT,
idQuestao03 INT,
idQuestao04 INT,
idQuestao05 INT,
FOREIGN KEY (usuario_id) REFERENCES usuario(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (curso_id) REFERENCES curso(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (disciplina_id) REFERENCES disciplina(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (idQuestao01) REFERENCES Questao(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (idQuestao02) REFERENCES Questao(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (idQuestao03) REFERENCES Questao(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (idQuestao04) REFERENCES Questao(id)
ON UPDATE CASCADE
ON DELETE SET NULL,
FOREIGN KEY (idQuestao05) REFERENCES Questao(id)
ON UPDATE CASCADE
ON DELETE SET NULL
);


############TABELA ALTERNATIVA###############

CREATE TABLE alternativa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    questao_id INT,
    enunciado VARCHAR(255) NOT NULL,
    correta TINYINT(1) DEFAULT 0,
    FOREIGN KEY (questao_id) REFERENCES questao(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO curso (nome, sigla) 
VALUES ('Desenvolvimento de Sistemas', 'DS');

INSERT INTO disciplina (nome, curso_id, sigla) VALUES
('Programação de algoritmos', 1, 'PA'),
('Banco de Dados', 1, 'BD'),
('Desenvolvimento de Sistemas', 1, 'DS'),
('Programação de Aplicativos Mobile', 1, 'PAM'),
('Análise e Projeto de Sistemas', 1, 'APS'),
('Sistemas Embarcados', 1, 'SE'),
('Segurança de Sistemas de Informação', 1, 'SSI'),
('Internet e Protocolos', 1, 'IP'),
('Inglês Instrumental', 1, 'II'),
('Design Digital', 1, 'DD'),
('Ética e Cidadania Organizacional', 1, 'ECO'),
('Linguagem, Trabalho e Tecnologia', 1, 'LTT'),
('Programação Web', 1, 'PW'),
('Operação de Software Aplicativo', 1, 'OSA');



###############ÍNDICES############################
CREATE INDEX idx_usuario_login ON usuario(login);
CREATE INDEX idx_disciplina_curso ON disciplina(curso_id);
CREATE INDEX idx_questao_disciplina ON questao(disciplina_id);

############---PROCEDURES---#############################

################ CURSO  ###########################
DELIMITER //
CREATE PROCEDURE InsertCurso(
    IN xNome VARCHAR(100), 
    IN xSigla VARCHAR(10)
)
BEGIN
    INSERT INTO curso (nome, sigla) VALUES (xNome, xSigla);
END //

CREATE PROCEDURE UpdateCurso(
    IN pId INT, 
    IN xNome VARCHAR(100),
    IN xSigla VARCHAR(10)
)
BEGIN
    UPDATE curso SET nome = xNome, sigla = xSigla WHERE id = pId;
END //

CREATE PROCEDURE DeleteCurso(IN pId INT)
BEGIN
    DELETE FROM curso WHERE id = pId;
END //

CREATE PROCEDURE SelectCurso()
BEGIN
    SELECT * FROM curso;
END //
DELIMITER ;
################ USUARIO #####################

DELIMITER //
CREATE PROCEDURE InsertUsuario(
    IN xLogin VARCHAR(100), 
    IN xEmail VARCHAR(100), 
    IN xSenha CHAR(64)
)
BEGIN
    INSERT INTO usuario (login, email, senha) 
    VALUES (xLogin, xEmail, SHA2(xSenha, 256));
END //

CREATE PROCEDURE UpdateUsuario(
    IN pId INT, 
    IN xLogin VARCHAR(100),
    IN xEmail VARCHAR(100),
    IN xSenha CHAR(64),
    IN xPontuacao INT
)
BEGIN
    UPDATE usuario 
    SET login = xLogin, 
        email = xEmail, 
        senha = SHA2(xSenha, 256), 
        pontuacao = xPontuacao
    WHERE id = pId;
END //

CREATE PROCEDURE DeleteUsuario(IN pId INT)
BEGIN
    DELETE FROM usuario WHERE id = pId;
END //

CREATE PROCEDURE SelectUsuario()
BEGIN
    SELECT * FROM usuario;
END //
DELIMITER ;

################ DISCIPLINA ###################
DELIMITER //
CREATE PROCEDURE InsertDisciplina(
    IN xNome VARCHAR(100),
    IN xCursoId INT,
    IN xSigla VARCHAR(10)
)
BEGIN
    INSERT INTO disciplina (nome, curso_id, sigla) 
    VALUES (xNome, xCursoId, xSigla);
END //

CREATE PROCEDURE UpdateDisciplina(
    IN pId INT, 
    IN xNome VARCHAR(100),
    IN xCursoId INT,
    IN xSigla VARCHAR(10)
)
BEGIN
    UPDATE disciplina 
    SET nome = xNome, curso_id = xCursoId, sigla = xSigla 
    WHERE id = pId;
END //

CREATE PROCEDURE DeleteDisciplina(IN pId INT)
BEGIN
    DELETE FROM disciplina WHERE id = pId;
END //

CREATE PROCEDURE SelectDisciplina()
BEGIN
    SELECT * FROM disciplina;
END //
DELIMITER ;

############## QUESTÃO ####################

DELIMITER //
CREATE PROCEDURE InsertQuestao(
    IN xEnunciado VARCHAR(255),
    IN xPontuacao INT,
    IN xDisciplinaId INT
)
BEGIN
    INSERT INTO questao (enunciado, pontuacao, disciplina_id) 
    VALUES (xEnunciado, xPontuacao, xDisciplinaId);
END //

CREATE PROCEDURE UpdateQuestao(
    IN pId INT,
    IN xEnunciado VARCHAR(255),
    IN xPontuacao INT,
    IN xDisciplinaId INT
)
BEGIN
    UPDATE questao 
    SET enunciado = xEnunciado, pontuacao = xPontuacao, disciplina_id = xDisciplinaId 
    WHERE id = pId;
END //

CREATE PROCEDURE DeleteQuestao(IN pId INT)
BEGIN
    DELETE FROM questao WHERE id = pId;
END //

CREATE PROCEDURE SelectQuestao()
BEGIN
    SELECT * FROM questao;
END //
DELIMITER ;

################ ALTERNATIVA ##################

DELIMITER //
CREATE PROCEDURE InsertAlternativa(
    IN xQuestaoId INT, 
    IN xEnunciado VARCHAR(255), 
    IN xCorreta TINYINT(1)
)
BEGIN
    INSERT INTO alternativa (questao_id, enunciado, correta) 
    VALUES (xQuestaoId, xEnunciado, xCorreta);
END //

CREATE PROCEDURE UpdateAlternativa(
    IN pId INT,
    IN xQuestaoId INT,
    IN xEnunciado VARCHAR(255),
    IN xCorreta TINYINT(1)
)
BEGIN
    UPDATE alternativa 
    SET questao_id = xQuestaoId, enunciado = xEnunciado, correta = xCorreta 
    WHERE id = pId;
END //

CREATE PROCEDURE DeleteAlternativa(IN pId INT)
BEGIN
    DELETE FROM alternativa WHERE id = pId;
END //

CREATE PROCEDURE SelectAlternativa()
BEGIN
    SELECT * FROM alternativa;
END //
DELIMITER ;

################# Quiz ##########################################

DELIMITER //
CREATE PROCEDURE InsertQuiz(
    IN xData DATE,
    IN xCursoId INT,
    IN xDisciplinaId INT,
    IN xUsuarioId INT,
    IN xPontuacao INT
)

BEGIN
    INSERT INTO quiz (data_quiz, curso_id, disciplina_id, usuario_id, pontuacao) 
    VALUES (xData, xCursoId, xDisciplinaId, xUsuarioId, xPontuacao);
END //

CREATE PROCEDURE UpdateQuiz(
    IN pId INT,
    IN xData DATE,
    IN xCursoId INT,
    IN xDisciplinaId INT,
    IN xUsuarioId INT,
    IN xPontuacao INT
)
BEGIN
    UPDATE quiz 
    SET data_quiz = xData, curso_id = xCursoId, disciplina_id = xDisciplinaId, 
        usuario_id = xUsuarioId, pontuacao = xPontuacao
    WHERE id = pId;
END //

CREATE PROCEDURE DeleteQuiz(IN pId INT)
BEGIN
    DELETE FROM quiz WHERE id = pId;
END //

CREATE PROCEDURE SelectQuiz()
BEGIN
    SELECT * FROM quiz;
END //

DELIMITER ;


################ Escolhas ####################

DELIMITER //
### Escolher disciplinas de um curso ###
CREATE PROCEDURE Escolher_Disciplinas_Curso(IN xCursoId INT)
BEGIN
    SELECT * FROM disciplina WHERE curso_id = xCursoId;
END //

### Escolher alternativas de uma questão ###
CREATE PROCEDURE Escolher_Alternativas_Questao(IN xQuestaoId INT)
BEGIN
    SELECT * FROM alternativa WHERE questao_id = xQuestaoId;
END //

### Escolher 5 questões aleatórias de uma disciplina ###
CREATE PROCEDURE Escolher_Questoes_Aleatorias(IN xDisciplinaId INT)
BEGIN
    SELECT * FROM questao 
    WHERE disciplina_id = xDisciplinaId
    ORDER BY RAND()
    LIMIT 5;
END //

##### Puxa as 5 questões que foi gerador aleatoriamente de uma vez #####
CREATE PROCEDURE SelecionarQuestoesQuiz(IN xQuizId INT)
BEGIN
    SELECT 
        q1.id AS Questao01_Id, q1.enunciado AS Questao01_Enunciado, q1.pontuacao AS Questao01_Pontuacao,
        q2.id AS Questao02_Id, q2.enunciado AS Questao02_Enunciado, q2.pontuacao AS Questao02_Pontuacao,
        q3.id AS Questao03_Id, q3.enunciado AS Questao03_Enunciado, q3.pontuacao AS Questao03_Pontuacao,
        q4.id AS Questao04_Id, q4.enunciado AS Questao04_Enunciado, q4.pontuacao AS Questao04_Pontuacao,
        q5.id AS Questao05_Id, q5.enunciado AS Questao05_Enunciado, q5.pontuacao AS Questao05_Pontuacao
    FROM quiz qu
    LEFT JOIN questao q1 ON qu.idQuestao01 = q1.id
    LEFT JOIN questao q2 ON qu.idQuestao02 = q2.id
    LEFT JOIN questao q3 ON qu.idQuestao03 = q3.id
    LEFT JOIN questao q4 ON qu.idQuestao04 = q4.id
    LEFT JOIN questao q5 ON qu.idQuestao05 = q5.id
    WHERE qu.id = xQuizId;
END //
DELIMITER ;


##########Ranking de usuários insignia###############

DELIMITER //
CREATE PROCEDURE RankingInsignia()
BEGIN
    SELECT 
        RANK() OVER (ORDER BY u.pontuacao DESC, COUNT(q.id) ASC) AS posicao,
        u.login,
        u.pontuacao,
        COUNT(q.id) AS total_quizzes,
        CASE
            WHEN RANK() OVER (ORDER BY u.pontuacao DESC, COUNT(q.id) ASC) = 1 THEN 'Ouro'
            WHEN RANK() OVER (ORDER BY u.pontuacao DESC, COUNT(q.id) ASC) = 2 THEN 'Prata'
            WHEN RANK() OVER (ORDER BY u.pontuacao DESC, COUNT(q.id) ASC) = 3 THEN 'Bronze'
            ELSE NULL
        END AS insignia
    FROM usuario u
    LEFT JOIN quiz q ON u.id = q.usuario_id
    GROUP BY u.id, u.login, u.pontuacao
    ORDER BY u.pontuacao DESC, total_quizzes ASC;
END //
DELIMITER ;

####### COMPARANDO LOGIN E VERIFICANDO EXISTENCIA ############

DELIMITER //
CREATE PROCEDURE Verificar_Se_Email_e_Senha_Batem(IN xEmail VARCHAR(100), IN xSenha VARCHAR(64))
BEGIN
    SELECT * FROM usuario
    WHERE email = xEmail AND senha = SHA2(xSenha, 256);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Verificar_Email_Existente(IN xEmail VARCHAR(100))
BEGIN
    SELECT COUNT(*) AS existe
    FROM usuario
    WHERE email = xEmail;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE BuscarUsuarioPorEmail(IN xEmail VARCHAR(100))
BEGIN
    SELECT * FROM usuario WHERE email = xEmail;
END //
DELIMITER ;




################ ATUALIZAR PONTUAÇÃO DO USUÁRIO ##########################################

DELIMITER //
CREATE PROCEDURE AtualizarPontuacaoUsuario(IN xUsuarioId INT)
BEGIN
    DECLARE total INT;
    SELECT IFNULL(SUM(pontuacao), 0)
    INTO total
    FROM quiz
    WHERE usuario_id = xUsuarioId;
    UPDATE usuario
    SET pontuacao = total
    WHERE id = xUsuarioId;
END //

CREATE TRIGGER trg_quiz_insert AFTER INSERT ON quiz
FOR EACH ROW
BEGIN
    CALL AtualizarPontuacaoUsuario(NEW.usuario_id);
END //

CREATE TRIGGER trg_quiz_update AFTER UPDATE ON quiz
FOR EACH ROW
BEGIN
    CALL AtualizarPontuacaoUsuario(NEW.usuario_id);
END //

CREATE TRIGGER trg_quiz_delete AFTER DELETE ON quiz
FOR EACH ROW
BEGIN
    CALL AtualizarPontuacaoUsuario(OLD.usuario_id);
END //
DELIMITER ;



DELIMITER //

##### Alternativa #####

CREATE PROCEDURE GetQuestoesEAlternativasPorDisciplina(
    IN idDisciplina INT
)
BEGIN
    SELECT 
        q.id AS id_questao,
        q.enunciado AS enunciado_questao,
        q.pontuacao,
        a.id AS id_alternativa,
        a.enunciado AS enunciado_alternativa,
        a.correta
    FROM (
        SELECT * FROM questao 
        WHERE disciplina_id = idDisciplina 
        ORDER BY RAND() 
        LIMIT 5
    ) AS q
    JOIN alternativa a ON a.questao_id = q.id
    ORDER BY q.id, a.id;
END //

DELIMITER ;

