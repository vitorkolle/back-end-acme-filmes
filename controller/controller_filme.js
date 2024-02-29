/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de filmes
 * Data: 01/02
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo responsavel pela interação com o BD
const filmesDAO = require('../model/DAO/filme.js')

//Função para validar e inserir um novo filme
const setInserirNovoFilme = async function(dadosFilme){
    //Cria o objeto JSON para devolver os dados criados na requisição
    let novoFilmeJSON = {}
    //Validação de campos obrigatórios ou com digitação inválida
    if( dadosFilme.nome == ''                    || dadosFilme.nome == undefined            || dadosFilme.nome.length > 80             || 
        dadosFilme.sinopse == ''                 || dadosFilme.sinopse == undefined         || dadosFilme.sinopse.length > 65000       ||
        dadosFilme.duracao == ''                 || dadosFilme.duracao == undefined         || dadosFilme.duracao.length > 8           ||
        dadosFilme.data_lancamento == ''         || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length != 10 ||
        dadosFilme.foto_capa == ''               || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa.length > 200       ||
        dadosFilme.valor_unitario.length > 6
    ){
        return message.ERROR_REQUIRED_FIELDS //400
        
    }else{
        let validateStatus = false

        if(dadosFilme.data_relancamento != null || dadosFilme.data_relancamento != ''){
            if(dadosFilme.data_relancamento.length != 10){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                validateStatus = true
            }
            }else{
                validateStatus = true
            }

        //encaminha os dados do filme para o DAO inserir no Banco de Dados
        let novoFilme = await filmesDAO.insertFilme(dadosFilme)

        //validação para verificar se o DAO inseriu os dados do Banco de Dados
        if(novoFilme){
            //Cria o JSON do retorno dos Dados (201)
            novoFilmeJSON.filme = dadosFilme
            novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM
            novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
            novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message

            return novoFilmeJSON //201
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

//Função para validar e atualizar um filme
const setAtualizarFilme = async function(){
}

//Função para excluir um filme
const setExcluirFilme = async function(){
}

//Função para retornar todos os filmes
const getListarFilmes = async function(){
    const filmesJSON = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if(dadosFilmes){
        if(dadosFilmes.length > 0){
            filmesJSON.file = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200
    
            return filmesJSON
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else
        return message.ERROR_INTERNAL_SERVER_DB //500
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function(id){
    //Recebe o ID do filme
    let idFilme = id
    //Cria o objeto JSON
    let filmesJSON = {}

    //Validação para verificar se o ID é válido
      //(vazio, indefinido, ou não numérico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400    
    }else{
        //Encaminha o ID para o DAO buscar no banco de dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        //Verifica se o DAO retornou dados
        if(dadosFilme){
            //Validação para verificar a quantidade de itens retornados
            if(dadosFilme.length > 0){
            //Cria o JSON para retorno
            filmesJSON.file = dadosFilme;
            filmesJSON.status_code = 200;
            
            return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

//Função para buscar um filme filtrando pelo nome
const getBuscarFilmeNome = async function(nome){
    //variável local para facilitar a validação
    const nomeFilme = nome
    //objeto JSON de filmes
    const filmesJSON = {}

    //validação do conteúdo da variável nome
    if(nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID_REQUEST //400
    }else{
        //encaminha o nome ao DAO para fazer a pesquisa no banco de dados 
        let dadosFilme = await filmesDAO.selectByNomeFilme(nomeFilme)
        //verifica se o DAO retornou dados
        if(dadosFilme){
            //validação para ver a quantidade de itens retornados
            if(dadosFilme.length > 0){
                //criação do json para retorno dos dados
                filmesJSON.file = dadosFilme
                filmesJSON.status_code = 200

                return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getBuscarFilmeNome
}