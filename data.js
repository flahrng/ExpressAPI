const Pessoa = require('./pessoa');

var listaPessoa = [];

addPessoa("João da Silva", "01/01/2000", "123.456.789-00", true, 1000);
addPessoa("Maria da Silva", "01/01/1998", "987.654.321-00", true, 1000);
addPessoa("José da Silva", "27/09/2010", null, false, 0.5);

function addPessoa(nome, dataNascimento, cpf, ativo, meta){
    const pessoa = new Pessoa(nome, dataNascimento, cpf, ativo, meta);
    pessoa.setId(listaPessoa.length + 1);
    listaPessoa.push(pessoa);
}

exports.listaPessoa = listaPessoa;
exports.addPessoa = addPessoa;