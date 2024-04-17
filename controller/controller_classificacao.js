/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de filmes
 * Data: 11/04
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
//import do arquivo que possui as mensagens padrão
const message = require('../modulo/config.js')

//import do arquivo que realizará as requisições ao banco de dados
const classificacaoDAO = require('../model/DAO/classificacao.js')

//criação da função que lista todas as classificações
const getAllClassificacoes = async function(){
    //JSON que vai guardar os dados das classificações
    const classificacoesJson = {}

    //variável que realiza a requisição no banco de dados
    let dadosClassificacacoes = await classificacaoDAO.selectAllClassificacoes()

    //verificar se a DAO retornou dados
    if(dadosClassificacacoes){
        //verificar quantos dados a DAO retornou
        if(dadosClassificacacoes.length > 0){
            classificacoesJson.classificacoes = dadosClassificacacoes
            classificacoesJson.quantidade = dadosClassificacacoes.length
            classificacoesJson.status_code = 200

            return classificacoesJson
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500

    }
}

//função que busca um filme no banco de dados filtrando pelo id
const getBuscarClassificacao = async function(id){
    //recebe o id da classificacao
    let idClassificacao = id

    //objeto que recebe os dados da classificacao
    let classificacaoJSON = {}

    //validar se o id é válido
    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID //400
    }else{
        let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)

        if(dadosClassificacao){
            if(dadosClassificacao.length > 0){
                classificacaoJSON.classificacao = dadosClassificacao
                classificacaoJSON.status_code = 200
                

                return classificacaoJSON
            }else{
                return message.ERROR_NOT_FOUND //400
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

//função que insere um filme no banco de dados
const setInserirNovaClassificacao = async function(dadosClassificacao, contentType){
    try {
        //validação do content type da requisição
        if(String(contentType).toLowerCase() == 'application/json'){ 
            //objeto que retorna os dados da requisição
            let novaClassificacaoJson = {}
            
            //validação do campos da requisição
            if(
                dadosClassificacao.faixa_etaria == ''        || dadosClassificacao.classificacao == ''        || dadosClassificacao.caracteristicas == ''        ||
                dadosClassificacao.faixa_etaria == null      || dadosClassificacao.classificacao == null      || dadosClassificacao.caracteristicas == null      ||
                dadosClassificacao.faixa_etaria == undefined || dadosClassificacao.classificacao == undefined || dadosClassificacao.caracteristicas == undefined ||
                dadosClassificacao.faixa_etaria.length > 5   || dadosClassificacao.classificacao.length > 7   || dadosClassificacao.caracteristicas.length > 10000  
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                //enacaminha dados para o banco de dados inserir a nova classificação
                let novaClassificacao = await classificacaoDAO.insertCLassificacao(dadosClassificacao)

                //validação para verificar se a DAO inseriu dados
                if(novaClassificacao){
                    novaClassificacaoJson.classificacao = dadosClassificacao
                    novaClassificacaoJson.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novaClassificacaoJson.status = message.SUCCESS_CREATED_ITEM.message

                    return novaClassificacaoJson //201
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }

}


module.exports = {
    getAllClassificacoes,
    getBuscarClassificacao,
    setInserirNovaClassificacao
}