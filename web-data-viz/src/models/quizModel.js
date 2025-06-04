var database = require("../database/config")

function registrar(fkusuario, fktipo) {
    var instrucao = `
    INSERT INTO resultado (fkusuario, fktipo) VALUES
    (${fkusuario}, ${fktipo});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    registrar
}