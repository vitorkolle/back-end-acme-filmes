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

module.exports = {
    getAllAtores
}