/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de atores
 * Data: 25/04
 * Versão: 1.0 
 *********************************************************************************************************************/
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const selectALlAtores = async function(){
    try {
        let sql = 'select * from tbl_ator'

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if(rsAtor){
            return rsAtor
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectBuscarAtor = async function(id){
    try {
        let sql = `select * from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if(rsAtor){
            return rsAtor
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const selectSexo = async function(id){
    try {
        let sql = `select * from tbl_sexoA where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        if(rsSexo){
            return rsSexo
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const insertAtor = async function(dadosAtor){
    try {
        let sql = ` insert into tbl_ator(
                nome,
                foto_ator,
                biografia,
                id_sexoA
            )values(
                '${dadosAtor.nome}',
                '${dadosAtor.foto_ator}',
                '${dadosAtor.biografia}',
                ${dadosAtor.id_sexoA}
            )`
            let rsAtor = await prisma.$executeRawUnsafe(sql)

            if(rsAtor){
                return true
            }else{
                return false
            }
    } catch (error) {
        return false   
    }
}

const selectLastIdAtor = async function(){
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_classificacao limit 1'

        let resultId = await prisma.$queryRawUnsafe(sql)

        if(resultId){
            return resultId
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    selectALlAtores,
    selectSexo,
    selectBuscarAtor,
    insertAtor,
    selectLastIdAtor
}