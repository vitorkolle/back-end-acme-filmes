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
        else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}

//função que retorna um gênero filtrando pelo id
const getBuscarGenero = async function (id) {
    let idGenero = id

    const generoJson = {}

    if (idGenero == '' || idGenero == null || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let dadosGenero = await generoDAO.selectByIdGenero(idGenero)

        if (dadosGenero) {
            if (dadosGenero.length > 0) {
                generoJson.genero = dadosGenero
                generoJson.status_code = 200

                return generoJson
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

//função que cadastra um gênero no banco de dados
const setCadastrarGenero = async function (dadosGenero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novoGeneroJson = {}

            if (
                dadosGenero.nome == '' || dadosGenero.nome == null || dadosGenero.nome == undefined || dadosGenero.nome.length > 70 ||
                dadosGenero.descricao_genero == '' || dadosGenero.descricao_genero == null || dadosGenero.descricao_genero == undefined
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let novoGenero = await generoDAO.insertGenero(dadosGenero)
                let novoId  = await generoDAO.selectIdLastGenero()

                if (novoGenero) {
                    novoGeneroJson.id = Number(novoId[0].id)
                    novoGeneroJson.genero = dadosGenero
                    novoGeneroJson.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoGeneroJson.message = message.SUCCESS_CREATED_ITEM.message

                    return novoGeneroJson
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500
    }
}

//função que deleta um gênero do banco de dados filtrando pelo id
const setDeletarGenero = async function (id) {
    let idGenero = id

    const validarId = await generoDAO.selectByIdGenero(idGenero)

    if (validarId.length > 0) {
        if (idGenero == '' || idGenero == null || isNaN(idGenero)) {
            return message.ERROR_INVALID_ID //400
        } else {
            let dadosGenero = await generoDAO.deleteGenero(id)

            if (dadosGenero) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    }
    else {
        return message.ERROR_NOT_FOUND //404
    }
}

//função que atualiza um gênero do banco de dados
const setAtualizarGenero = async function (id, dadosGenero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

        let idGenero = id

        const validarId = await generoDAO.selectByIdGenero(idGenero)

            if (validarId.length > 0) {

                let novoGeneroJson = {}

                if (
                    dadosGenero.nome == '' || dadosGenero.nome == null || dadosGenero.nome == undefined || dadosGenero.nome.length > 70 ||
                    dadosGenero.descricao_genero == '' || dadosGenero.descricao_genero == null || dadosGenero.descricao_genero == undefined
                ){
                    return message.ERROR_REQUIRED_FIELDS //400
                }
                else{
                    dadosGenero.id = idGenero
                    let novosDadosGenero = await generoDAO.updateGenero(dadosGenero)

                    if(novosDadosGenero){
                        novoGeneroJson.genero = dadosGenero
                        novoGeneroJson.status = message.SUCCESS_UPDATED_ITEM
                        novoGeneroJson.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                        novoGeneroJson.message = message.SUCCESS_UPDATED_ITEM.message

                        return novoGeneroJson
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 controller
    }
}

module.exports = {
    getListarALlGeneros,
    getBuscarGenero,
    setCadastrarGenero,
    setDeletarGenero,
    setAtualizarGenero
}