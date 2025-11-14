const express = require('express');
const router = express.Router();
const alternativaController = require("../controllers/alternativaController");

// CRUD - alternativa
router.post("/api/alternativa", alternativaController.criarAlternativa)
router.get('/api/alternativa', alternativaController.selecionarTodasAlternativas);              
router.put('/alternativa/:id', alternativaController.atualizarAlternativa);      
router.delete('/alternativa/:id', alternativaController.deletarAlternativa);

router.get('/alternativa/questao/:questao_id', consultarAlternativaPorIDQuestao);
module.exports = router;