var quizModel = require("../models/quizModel");

function registrar(req, res) {
    var fkusuario = req.body.fkusario;
    var fktipo = req.body.fktipo;

    if (fkusuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (fktipo == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        quizModel.registrar(fkusuario, fktipo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    registrar
}