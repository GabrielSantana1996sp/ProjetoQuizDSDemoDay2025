const express = require("express");
const router = express.Router();
const disciplinaController = require("../controllers/disciplinaController");
const verifyJwt = require("../config/middleware/verifyToken");

// CRUD - disciplina
router.post("/api/disciplina", disciplinaController.criarDisciplina);
router.get("/api/disciplina", disciplinaController.selecionarTodasDisciplinas);
router.put("/api/disciplina/:id", disciplinaController.atualizarDisciplina);
router.delete("/api/disciplina/:id", disciplinaController.deletarDisciplina);

router.get("/api/disciplinaPorCursoId/:id", disciplinaController.consultarDisciplinasPorCursoId);

// nova rota
router.get("/api/disciplina/:id", disciplinaController.findDisciplinaById)

module.exports = router;
