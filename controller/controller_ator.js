/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de atores
 * Data: 11/04
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

const message = require('../modulo/config.js')

const atorDAO = require('../model/DAO/atores.js')

const getAllAtores = async function(){
    const atoresJSON = {}

    let dadosAtores = await atorDAO.selectALlAtores()
    
    if(dadosAtores){
        if(dadosAtores.length > 0){
            for (let index = 0; index < dadosAtores.length; index++) {
                const element = dadosAtores[index]
                let sexoAtor = await atorDAO.selectSexo(element.id_sexoA)
                delete element.id_sexoA
                element.sexo = sexoAtor[0].sexo
            }

            atoresJSON.atores = dadosAtores
            atoresJSON.quantidade = dadosAtores.length
            atoresJSON.status_code = 200

            return atoresJSON
        }
        else{
           return message.ERROR_NOT_FOUND //404
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB //500
    }

}

const getAtor = async function(id){
    let idAtor  = id

    const atorJSON = {}

    if(idAtor == '' || idAtor == undefined || isNaN(idAtor)){
        return message.ERROR_INVALID_ID //400
    }else{
        let resultDadosAtor = await atorDAO.selectBuscarAtor(id)
        
        for (let index = 0; index < resultDadosAtor.length; index++) {
            const element = resultDadosAtor[index]
            let sexoAtor = await atorDAO.selectSexo(element.id_sexoA)
            delete element.id_sexoA
            element.sexo = sexoAtor[0].sexo
        }
        
        if(resultDadosAtor){
            if(resultDadosAtor.length > 0){
                atorJSON.ator = resultDadosAtor
                atorJSON.status_code = 200

                return atorJSON
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
    
}

const setInserirAtor = async function(dadosAtor, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json'){

            let novoAtorJSON = {}

            if(
                dadosAtor.nome == ''      || dadosAtor.nome == null       || dadosAtor.nome == undefined      || dadosAtor.nome.length > 80      ||
                dadosAtor.foto_ator == '' || dadosAtor.foto_ator == null  || dadosAtor.foto_ator == undefined || dadosAtor.foto_ator.length > 80 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == null  || dadosAtor.biografia == undefined ||
                dadosAtor.id_sexoA == ''  || dadosAtor.id_sexoA == null  || dadosAtor.id_sexoA == undefined   || isNaN(dadosAtor.id_sexoA)
            ){
                return message.ERROR_REQUIRED_FIELDS //400
            }else{
                let novoAtor = await atorDAO.insertAtor(dadosAtor)
                let novoId = await atorDAO.selectLastIdAtor()
                let sexoAtor = await atorDAO.selectSexo(dadosAtor.id_sexoA)

                if(novoAtor){
                    novoAtorJSON.id = Number(novoId[0].id)
                    novoAtorJSON.ator = dadosAtor
                    novoAtor.sexo = sexoAtor
                    novoAtorJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code //200
                    novoAtorJSON.message = message.SUCCESS_CREATED_ITEM.message

                    return novoAtorJSON
                }else{
                    return message.ERROR_INTERNAL_SERVER_DB //500
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
    getAllAtores,
    getAtor,
    setInserirAtor
}