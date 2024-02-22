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
const setInserirNovoFilme = async function(){
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