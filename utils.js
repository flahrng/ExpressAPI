const moment = require('moment');

function isCpfValido(cpf){
    var soma = 0;
    var resto;
    
    cpf = cpf.replace(/[^a-zA-Z0-9]/g,'');

    if (cpf == "00000000000" || cpf.length != 11) {
        return false;
    } 

    for (i=1; i<=9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        resto = (soma * 10) % 11;
    }

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    } 

    if (resto != parseInt(cpf.substring(9, 10)) ) {
        return false;
    }

    soma = 0;
    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        resto = (soma * 10) % 11;
    }

    if ((resto == 10) || (resto == 11)){
        resto = 0;
    }  

    if (resto != parseInt(cpf.substring(10, 11) ) ){
        return false;
    }

    return true;
}

function isEmptyOrNull(str){
    if(str == null || str == ""){
        return true;
    }
    return false;
}

function isNomeValido(nome){
    if(nome.length > 50 || nome.length == 0 || nome == null){
        return false;
    }
    return true;
}

function isMetaValida(meta){
    if(meta <= 0){
        return false;
    }
    return true;
}

function isDataValida(data){
    const dataAtual = moment().format("YYYY-MM-DD");
    const dataNascimento = moment(data).format("YYYY-MM-DD");

    if(data !== dataNascimento || dataNascimento > dataAtual){
        return false;
    }
    return true;
}

function isAtivoValido(ativo){    
    if(ativo){
        return true;
    }

    return false;
}

exports.isCpfValido = isCpfValido;
exports.isEmptyOrNull = isEmptyOrNull;
exports.isNomeValido = isNomeValido;
exports.isMetaValida = isMetaValida;
exports.isDataValida = isDataValida;
exports.isAtivoValido = isAtivoValido;