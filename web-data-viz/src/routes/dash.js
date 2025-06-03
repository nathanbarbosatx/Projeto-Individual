var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/dashController");

router.get("/ultimas/:fktipo", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:fktipo", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

module.exports = router;