/************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, consisitência de dados das requisições da API de filmes
 * Data: 01/02
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

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
    const jsonFilmes = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if(dadosFilmes){
        jsonFilmes.filmes = dadosFilmes
        jsonFilmes.quantidade = dadosFilmes.lenght
        jsonFilmes.status_code = 200

        return jsonFilmes
    }else
        return false
}

//Função para buscar um filme pelo id
const getBuscarFilme = async function(){
}

module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme
}