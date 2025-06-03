var database = require("../database/config");

function buscarUltimasMedidas(fktipo) {

    var instrucaoSql = `select t.tipo, count(*) as qtdTipoDoador 
    from Resultado as r 
    join tipodoador as t on t.idtipo = r.fktipo
    where fktipo = ${fktipo}
    group by t.tipo;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fktipo) {

    var instrucaoSql = `select t.tipo, count(*) as qtdTipoDoador 
    from Resultado as r 
    join tipodoador as t on t.idtipo = r.fktipo
    where fktipo = ${fktipo}
    group by t.tipo;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}