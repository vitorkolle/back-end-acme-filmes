/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de filmes
 * Data: 11/04
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
//import do arquivo que possui as mensagens padrão
const message = require('../modulo/config.js')

//import do arquivo que realizará as requisições ao banco de dados
const classificacaoDao = require('../model/DAO/classificacao.js')

//criação da função que lista todas as classificações
const getAllClassificacoes = async function(){
    //JSON que vai guardar os dados das classificações
    const classificacoesJson = {}

    //variável que realiza a requisição no banco de dados
    let dadosClassificacacoes = await classificacaoDao.selectAllClassificacoes()

    //verificar se a DAO retornou dados
    if(dadosClassificacacoes){
        //verificar quantos dados a DAO retornou
        if(dadosClassificacacoes.length > 0){
            classificacoesJson.classificacoes = dadosClassificacacoes
            classificacoesJson.quantidade = dadosClassificacacoes.length
            classificacoesJson.status = 200

            return classificacoesJson
        }else{
            return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500

    }
}


module.exports = {
    getAllClassificacoes
}