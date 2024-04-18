/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de gênero
 * Data: 18/04
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
//DAO de gênero
const generoDAO = require('../model/DAO/genero')
//arquivo que guarda as mensagens globais
const message = require('../modulo/config')

//função que retorna todos os gêneros do banco de dados
const getListarALlGeneros = async function () {
    const generosJson = {}

    let dadosGenero = await generoDAO.selectAllGeneros()
   
    if (dadosGenero) {
        if (dadosGenero.length > 0) {
            generosJson.generos = dadosGenero
            generosJson.status_code = 200
            generosJson.quantidade = dadosGenero.length

            return generosJson
        }
        else{
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

const getBuscarGenero = async function(id){
    let idGenero = id

    const generoJson = {}

    if(idGenero == '' || idGenero == null || isNaN(idGenero)){
        return message.ERROR_INVALID_ID //400
    }else{
        let dadosGenero = await generoDAO.selectByIdGenero(idGenero)

        if(dadosGenero){
            if(dadosGenero.length > 0){
                generoJson.genero = dadosGenero
                generoJson.status_code = 200

                return generoJson
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

module.exports = {
    getListarALlGeneros,
    getBuscarGenero
}