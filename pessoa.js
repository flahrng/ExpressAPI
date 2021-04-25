module.exports = class Pessoa {
    
    constructor(nome, dataNascimento, cpf, ativo, meta) {           
        this.id = null;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.ativo = ativo;
        this.meta = meta;
    }

    setId(id){
        this.id = id;     
    }
}