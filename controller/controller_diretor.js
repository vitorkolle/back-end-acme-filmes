/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de diretores
 * Data: 11/04
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../modulo/config.js')

const diretorDAO = require('../model/DAO/diretores.js')

const getAllDiretores = async function () {
    const diretoresJSON = {}

    let dadosDiretores = await diretorDAO.selectALlDiretores()

    if (dadosDiretores) {
        if (dadosDiretores.length > 0) { 
            for (let index = 0; index < dadosDiretores.length; index++) { 
                const element = dadosDiretores[index]

                let sexoDiretor = await diretorDAO.selectSexo(element.id_sexoD)
                element.sexo = sexoDiretor[0].sexo

                let nacionalidadeDiretor = await diretorDAO.selectNacionalidadeDiretor(element.id)
                if(nacionalidadeDiretor){
                    element.nacionalidade = nacionalidadeDiretor[index].pais
                }else{
                    element.nacionalidade = null
                }

                let filmesDiretor = await diretorDAO.selectFilmesDiretor(element.id)
                element.filmes = filmesDiretor
            }

            diretoresJSON.diretores = dadosDiretores
            diretoresJSON.quantidade = dadosDiretores.length
            diretoresJSON.status_code = 200

            return diretoresJSON
        }
        else {
            return message.ERROR_NOT_FOUND //404
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }

}

const getDiretor = async function (id) {
    let idDiretor = id

    const diretorJSON = {}

    if (idDiretor == '' || idDiretor == undefined || isNaN(idDiretor)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let resultDadosDiretor = await diretorDAO.selectBuscarDiretor(idDiretor)

        for (let index = 0; index < resultDadosDiretor.length; index++) {
            const element = resultDadosDiretor[index]

            let sexoDiretor = await diretorDAO.selectSexo(element.id_sexoD)
            element.sexo = sexoDiretor[0].sexo

            let filmesDiretor = await diretorDAO.selectFilmesDiretor(element.id)
            element.filmes = filmesDiretor[index].titulo
        }

        if (resultDadosDiretor) {
            if (resultDadosDiretor.length > 0) {
                diretorJSON.ator = resultDadosDiretor
                diretorJSON.status_code = 200

                return diretorJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

const setInserirDiretor = async function (dadosDiretor, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoDiretorJSON = {} 

            if (
                dadosDiretor.nome == ''            || dadosDiretor.nome == null            || dadosDiretor.nome == undefined                  || dadosDiretor.nome.length > 80 ||
                dadosDiretor.foto_diretor == ''    || dadosDiretor.foto_diretor == null    || dadosDiretor.foto_diretor == undefined          || dadosDiretor.foto_diretor.length > 80    ||
                dadosDiretor.data_nascimento == '' || dadosDiretor.data_nascimento == null || dadosDiretor.data_nascimento == undefined       || dadosDiretor.data_nascimento.length > 10 ||
                dadosDiretor.biografia == ''       || dadosDiretor.biografia == null       || dadosDiretor.biografia == undefined             ||
                dadosDiretor.id_sexoD == ''        || dadosDiretor.id_sexoD == null        || dadosDiretor.id_sexoD == undefined              || isNaN(dadosDiretor.id_sexoD)                                  ||
                dadosDiretor.id_filme == ''        || dadosDiretor.id_filme == null        || dadosDiretor.id_filme == undefined              || isNaN(dadosDiretor.id_filme)
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
                let novoDiretor = await diretorDAO.insertDiretor(dadosDiretor)
                let novoId = await diretorDAO.selectLastIdDiretor()
                let filmesDiretor = await diretorDAO.insertFilmesDiretor(dadosDiretor.id_filme, novoId[0].id)
                let sexoDiretor = await diretorDAO.selectSexo(dadosDiretor.id_sexoD)

                if (novoDiretor) {
                    novoDiretorJSON.id = Number(novoId[0].id)
                    novoDiretorJSON.ator = dadosDiretor
                    novoDiretorJSON.sexo = sexoDiretor[0].sexo
                    novoDiretorJSON.filmes = filmesDiretor
                    novoDiretorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code //200
                    novoDiretorJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoDiretorJSON
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

const setDeletarDiretor = async function (id) {
    let idDiretor = id

    let validarId = await diretorDAO.selectBuscarDiretor(idDiretor)

    if (validarId.length > 0) {
        if (idDiretor == '' || idDiretor == null || idDiretor == undefined) {
            return message.ERROR_INVALID_ID //400
        } else {
            let dadosDiretor = await diretorDAO.deleteDiretor(idDiretor)

            if (dadosDiretor) {
                return message.SUCCESS_DELETED_ITEM //200
            } else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

module.exports = {
    getAllDiretores,
    getDiretor,
    setInserirDiretor,
    setDeletarDiretor
}