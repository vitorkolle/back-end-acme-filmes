/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de classificação
 * Data: 11/04
 * Versão: 1.0 
 *********************************************************************************************************************/

//import da biblioteca prisma client
const {PrismaClient} = require('@prisma/client')

//instância da classe prisma client
const prisma = new PrismaClient()

//função para retornar todas as classificações do banco de dados
const selectAllClassificacoes = async function(){
    try {
        let sql = 'select * from tbl_classificacao'
        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao       
    } catch (error) {
        return false
    }
}

module.exports = {
    selectAllClassificacoes
}