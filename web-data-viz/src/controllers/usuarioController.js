var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
   var email = req.headers['email-server'];
    var senha = req.headers['senha-server'];

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }

    usuarioModel.autenticar(email, senha)
        .then(resultadoAutenticar => {
            if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);

                    res.json({
                        idusuario: resultadoAutenticar[0].idusuario,
                        nome: resultadoAutenticar[0].nome,
                        email: resultadoAutenticar[0].email
                    });} 
                    else {
                res.status(401).json({ mensagem: "E-mail ou senha inválidos!" });
            }
        })
        .catch(erro => {
            console.error("Erro na autenticação:", erro);
            res.status(500).json({ erro: "Erro interno ao autenticar usuário." });
        });
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
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
    autenticar,
    cadastrar
}