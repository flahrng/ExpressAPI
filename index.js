const data = require('./data');
const utils = require('./utils');
const express = require('express');
const StringMask = require('string-mask');
const app = express();
const port = 3000;

app.use(express.json());
app.route('/api/pessoas')
.get(function(req, res) {
    var pagina = req.query.pagina;
    var tamanho = req.query.tamanho;
    var numeroRegistros = data.listaPessoa.length;

    var obj = {
        'pagina' : pagina,
        'tamanho' : tamanho,
        'numeroRegistros' : numeroRegistros,
        registros: []
    };

    data.listaPessoa.forEach(function(item) {         
        obj.registros.push(item);
    })

    res.send(JSON.stringify(obj));
})
.post(function(req, res) {
    var nome = req.query.nome != undefined ? req.query.nome : null;
    var dataNascimento = req.query.dataNascimento != undefined ? req.query.dataNascimento : null;
    var cpf = req.query.cpf != undefined ? req.query.cpf : null;
    var ativo = req.query.ativo != undefined ? req.query.ativo : null;
    var meta = req.query.meta != undefined ? req.query.meta : null;
    
    if(utils.isEmptyOrNull(nome) || utils.isEmptyOrNull(dataNascimento) || utils.isEmptyOrNull(ativo) || utils.isEmptyOrNull(meta)){
        res.send("Informe um valor válido para as informações obrigatórias!").end();
        return;
    }  
        
    if(!utils.isDataValida(dataNascimento)){
        res.send("Informe um valor válido para 'Data de Nascimento'!").end();
        return;
    }

    if(!utils.isNomeValido(nome)){
        res.send("Informe um valor válido para 'Nome'!").end();
        return;
    }

    if(!utils.isMetaValida(meta)){
        res.send("Informe um valor válido para 'Meta'!").end();
        return;
    }

    if(!utils.isAtivoValido(ativo)){
        res.send("Informe um valor válido para 'Ativo'!").end();
        return;
    }

    if(!utils.isCpfValido(cpf)){
        res.send("Informe um valor válido para 'CPF'!").end();
        return;
    }

    var formatter = new StringMask('000.000.000-00');
    var cpf = formatter.apply(cpf);
    var cpfJaCadastrado = false;

    data.listaPessoa.forEach(function(item) {         
        if(item.cpf === cpf){
            cpfJaCadastrado = true;
        }
    })

    if(cpfJaCadastrado){
        res.send("O CPF informado já existe na base!").end();
        return;
    }

    data.addPessoa(nome, dataNascimento, cpf, ativo, meta);
    res.send("Usuário cadastrado!").end();        
});

app.route('/api/pessoas/:id')
.get(function(req, res) {
    var id = req.params.id;
    var exist = false;
    var obj = "";

    data.listaPessoa.forEach(function(item) {           
        if(item.id == id){            
            obj = item;            
            exist = true;
        }        
    })

    if(exist){
        res.send(obj).end();
    } else {
        res.send("Usuário não encontrado!").end();     
    }
})
.put(function(req, res) {
    var id = req.params.id;
    var nome = req.body.nome != undefined ? req.body.nome : null;
    var dataNascimento = req.body.dataNascimento != undefined ? req.body.dataNascimento : null;
    var cpf = req.body.cpf != undefined ? req.body.cpf : null;
    var ativo = req.body.ativo != undefined ? req.body.ativo : null;
    var meta = req.body.meta != undefined ? req.body.meta : null;
    var erros = [];
    var exist = false;

    data.listaPessoa.forEach(function(item) {           
        if(item.id == id){                    
            exist = true;
            
            if(nome !== null){
                if(utils.isNomeValido(nome)){                    
                    item.nome = nome;
                } else {    
                    erros.push("Informe um valor válido para 'Nome'!");
                }
            }
            
            if(dataNascimento !== null){
                if(utils.isDataValida(dataNascimento)){
                    item.dataNascimento = dataNascimento;                    
                } else {     
                    erros.push("Informe um valor válido para 'Data de Nascimento'!");
                }
            }            

            if(cpf !== null){
                if(utils.isCpfValido(cpf)){
                    var formatter = new StringMask('000.000.000-00');
                    cpf = cpf.replace(/[^a-zA-Z0-9]/g,'');
                    var cpf2 = formatter.apply(cpf);
                    item.cpf = cpf2;
                } else {                                        
                    erros.push("Informe um valor válido para 'CPF'!");
                }
            }
            
            if(ativo !== null){
                if(utils.isAtivoValido(ativo)){
                    item.ativo = ativo;
                } else {                    
                    erros.push("Informe um valor válido para 'Ativo'!");                    
                }
            }
            
            if(meta !== null){
                if(utils.isMetaValida(meta)){
                    item.meta = meta;                    
                } else {                       
                    erros.push("Informe um valor válido para 'Meta'!");                 
                }
            }            
        }     
    })

    if(exist){
        if(erros.length > 0){
            erros.forEach(function(item) {         
                res.write(item + "\n");
            })
            res.write("Usuário não editado!");
        } else {
            res.write("Usuário editado!");
        }
    } else {
        res.write("Usuário não existe!");
    }

    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})