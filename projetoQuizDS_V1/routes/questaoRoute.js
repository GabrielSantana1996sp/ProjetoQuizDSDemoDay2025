const express = require("express");
const router = express.Router();
const questaoController = require("../controllers/questaoController");

// CRUD - questao
router.post("/questoes", questaoController.criarQuestao);
router.put("/questoes/:id", questaoController.atualizarQuestao);
router.delete("/questoes/:id", questaoController.deletarQuestao);

//NOVA ROTA
router.get("/api/questaoByDisciplinaId/:id", questaoController.findQuestoesByDiscipinaId)

module.exports = router;
