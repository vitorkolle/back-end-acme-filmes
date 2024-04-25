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
const classificacaoDAO = require('../model/DAO/classificacao.js')

//Função para validar e inserir um novo filme
const setInserirNovoFilme = async function (dadosFilme, contentType) {
    try {
        //Validação do content type da requisição
        if (String(contentType).toLowerCase() == 'application/json') {
            //Cria o objeto JSON para devolver os dados criados na requisição
            let novoFilmeJSON = {}
            //Validação de campos obrigatórios ou com digitação inválida                            
            if (dadosFilme.nome == ''                || dadosFilme.nome == undefined             || dadosFilme.nome == null             || dadosFilme.nome.length > 80             ||
                dadosFilme.sinopse == ''             || dadosFilme.sinopse == undefined          || dadosFilme.sinopse == null          || dadosFilme.sinopse.length > 65000       ||
                dadosFilme.duracao == ''             || dadosFilme.duracao == undefined          || dadosFilme.duracao == null          || dadosFilme.duracao.length > 8           ||
                dadosFilme.data_lancamento == ''     || dadosFilme.data_lancamento == undefined  || dadosFilme.data_lancamento == null  || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == ''           || dadosFilme.foto_capa == undefined        || dadosFilme.foto_capa == null        || dadosFilme.foto_capa.length > 200       ||
                dadosFilme.valor_unitario.length > 6 ||
                dadosFilme.id_favorito == ''         || dadosFilme.id_favorito == undefined      || dadosFilme.id_favorito == null      || isNaN(dadosFilme.id_favorito)           || 
                dadosFilme.id_classificacao == ''    || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null || isNaN(dadosFilme.id_classificacao)           
            ) {
                return message.ERROR_REQUIRED_FIELDS //400

            } else {
                let validateStatus = false

                //Validação da data de relancamento, já que ela não é obrigatória no banco de dados
                if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != undefined) {
                    //Validação para verificar se a data está com a data de dígitos correta
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //Validação para verificar se podemos encaminhar os dados para o DAO
                if (validateStatus) {
                    //encaminha os dados do filme para o DAO inserir no Banco de Dados
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)
                    let filmeId = await filmesDAO.selectIdLastFilme()
                    let favorito = await filmesDAO.selectFavorito(dadosFilme.id_favorito)
                    let classificacao = await classificacaoDAO.selectByIdClassificacao(dadosFilme.id_classificacao)
                    console.log(classificacao)

                    //validação para verificar se o DAO inseriu os dados do Banco de Dados
                    if (novoFilme && filmeId && favorito && classificacao) {
                        //Cria o JSON do retorno dos Dados (201)
                        novoFilmeJSON.filme = dadosFilme
                        novoFilmeJSON.favorito = Number(favorito[0].favorito)
                        novoFilmeJSON.classificacao = classificacao[0]
                        novoFilmeJSON.filme.id = Number(filmeId[0].id)
                        novoFilmeJSON.status = message.SUCCESS_CREATED_ITEM
                        novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novoFilmeJSON.message = message.SUCCESS_CREATED_ITEM.message

                        return novoFilmeJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    }
    catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 erro na controller
    }
}

//Função para validar e atualizar um filme
const setAtualizarFilme = async function (id, novosDados, contentType) {
    try {
        let contentTypeL = contentType

        if (String(contentTypeL).toLowerCase() == 'application/json') {

            let idFilme = id
            const validarId = await filmesDAO.selectByIdFilme(idFilme)

            if (validarId.length > 0) {

                let filmeAtualizadoJSON = {}

                if (novosDados.nome == '' || novosDados.nome == undefined || novosDados.nome == null || novosDados.nome.length > 80 ||
                    novosDados.sinopse == '' || novosDados.sinopse == undefined || novosDados.sinopse == null || novosDados.sinopse.length > 65000 ||
                    novosDados.duracao == '' || novosDados.duracao == undefined || novosDados.duracao == null || novosDados.duracao.length > 8 ||
                    novosDados.data_lancamento == '' || novosDados.data_lancamento == undefined || novosDados.data_lancamento == null || novosDados.data_lancamento.length != 10 ||
                    novosDados.foto_capa == '' || novosDados.foto_capa == undefined || novosDados.foto_capa == null || novosDados.foto_capa.length > 200 ||
                    novosDados.valor_unitario.length > 6
                ) {
                    return message.ERROR_REQUIRED_FIELDS
                } else {
                    let validateStatus = false

                    if (novosDados.data_relancamento != '' && novosDados.data_relancamento != null && novosDados.data_relancamento != undefined) {
                        if (novosDados.data_relancamento.length != 10) {
                            return message.ERROR_REQUIRED_FIELDS //400
                        } else {
                            validateStatus = true
                        }
                    } else {
                        validateStatus = true
                    }

                    if (validateStatus) {
                        novosDados.id = id
                        let filmeAtualizado = await filmesDAO.updateFilme(novosDados)

                        if (filmeAtualizado) {
                            filmeAtualizadoJSON.filme = novosDados
                            filmeAtualizadoJSON.status = message.SUCCESS_UPDATED_ITEM
                            filmeAtualizadoJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                            filmeAtualizadoJSON.message = message.SUCCESS_UPDATED_ITEM.message

                            return filmeAtualizadoJSON
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    }

                }
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 controller        
    }
}

//Função para excluir um filme
const setExcluirFilme = async function (id) {
    //recebe o id do filme
    let idFilme = id

    let validarId = await filmesDAO.selectByIdFilme(idFilme)

    if (validarId.length > 0) {
        //verifica se o id recebido é válido
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID //400
        } else {
            //Encaminha o id para a DAO deletar no banco de dados
            let dadosFilme = await filmesDAO.deleteFilme(idFilme)

            //verificar se a DAO apagou o filme
            if (dadosFilme) {
                return message.SUCCESS_DELETED_ITEM //200            
            }
            else {
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }

    } else {
        return message.ERROR_NOT_FOUND //404
    }
}

//Função para retornar todos os filmes
const getListarFilmes = async function () {
    const filmesJSON = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            if(dadosFilmes.favorito == 1){
                filmesJSON.filmes.favorito = true
            }
            else if (dadosFilmes.favorito == 0){
                filmesJSON.filmes.favorito = false
            }
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200

            console.log(filmesJSON)

            return filmesJSON
        } else {
            return message.ERROR_NOT_FOUND //404
        }
    } else
        return message.ERROR_INTERNAL_SERVER_DB //500
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function (id) {
    //Recebe o ID do filme
    let idFilme = id
    //Cria o objeto JSON
    let filmesJSON = {}

    //Validação para verificar se o ID é válido
    //(vazio, indefinido, ou não numérico)
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400    
    } else {
        //Encaminha o ID para o DAO buscar no banco de dados
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        //Verifica se o DAO retornou dados
        if (dadosFilme) {
            //Validação para verificar a quantidade de itens retornados
            if (dadosFilme.length > 0) {
                //Cria o JSON para retorno
                filmesJSON.file = dadosFilme;
                filmesJSON.status_code = 200;

                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }

}

//Função para buscar um filme filtrando pelo nome
const getBuscarFilmeNome = async function (nome) {
    //variável local para facilitar a validação
    const nomeFilme = nome
    //objeto JSON de filmes
    const filmesJSON = {}

    //validação do conteúdo da variável nome
    if (nomeFilme == '' || nomeFilme == undefined) {
        return message.ERROR_INVALID_REQUEST //400
    } else {
        //encaminha o nome ao DAO para fazer a pesquisa no banco de dados 
        let dadosFilme = await filmesDAO.selectByNomeFilme(nomeFilme)
        //verifica se o DAO retornou dados
        if (dadosFilme) {
            //validação para ver a quantidade de itens retornados
            if (dadosFilme.length > 0) {
                //criação do json para retorno dos dados
                filmesJSON.file = dadosFilme
                filmesJSON.status_code = 200

                return filmesJSON
            } else {
                return message.ERROR_NOT_FOUND //404
            }
        } else {
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