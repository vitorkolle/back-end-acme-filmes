/************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de gênero
 * Data: 18/04
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
//import da biblioteca prisma
const {PrismaClient} = require('@prisma/client')

//instância do prisma
const prisma = new PrismaClient()

//função que lista todos os gêneros do banco de dados
const selectAllGeneros = async function(){
    try {
        let sql = 'select * from tbl_genero'

        let rsGenero = await prisma.$queryRawUnsafe(sql)

        if(rsGenero){
            return rsGenero
        }else{
            return false
        }
    } catch (error) {
        return false       
    }
}

//função que retorna um gênero filtrando pelo id
const selectByIdGenero = async function(id){
    try {
        let sql = `select * from tbl_genero where id = ${id}`

        const rsGenero = prisma.$queryRawUnsafe(sql)
        if(rsGenero){
            return rsGenero
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//função que cadastra um gênero no banco de dados
const insertGenero = async function(dadosGenero){
    try {
        let sql = 
        `
        insert into tbl_genero
        (
            nome, 
            descricao_genero
        )
        values(
            '${dadosGenero.nome}',
            '${dadosGenero.descricao_genero}'
              )
        `
        let rsGenero = await prisma.$queryRawUnsafe(sql)

        if(rsGenero){
            return rsGenero
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    selectAllGeneros,
    selectByIdGenero,
    insertGenero
}