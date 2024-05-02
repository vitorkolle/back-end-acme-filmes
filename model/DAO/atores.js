/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de atores
 * Data: 25/04
 * Versão: 1.0 
 *********************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectALlAtores = async function () {
    try {
        let sql = 'select * from tbl_ator'

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if (rsAtor) {
            return rsAtor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectBuscarAtor = async function (id) {
    try {
        let sql = `select * from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)

        if (rsAtor) {
            return rsAtor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexoA where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)

        if (rsSexo) {
            return rsSexo
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const insertAtor = async function (dadosAtor) {
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

        if (rsAtor) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const insertFilmesAtor = async function (id_filme, id_ator) {
    try {
        let sql = `insert into tbl_ator_filme

        (
            id_ator,
            id_filme
          )
          values(
            ${id_ator},
            ${id_filme}
          )`

         
          let rsAtorFilme = await prisma.$executeRawUnsafe(sql)

          if(rsAtorFilme){         
            let sqlFilmes = `select * from tbl_filme where id = ${id_filme}`

            let rsFilme = await prisma.$queryRawUnsafe(sqlFilmes)

            if(rsFilme){
                return rsFilme
            }else{
                return false
            }
          }
          else{
            return false
          }
    } catch (error) {
        return false
    }
}

const selectLastIdAtor = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_ator limit 1'

        let resultId = await prisma.$queryRawUnsafe(sql)

        if (resultId) {
            return resultId
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteAtor = async function (id) {
    try {
        let sql 
        
        sql =  
        `
        SET FOREIGN_KEY_CHECKS=0;
        `
        let rs1 = await prisma.$executeRawUnsafe(sql)

        if(rs1 == 0){
            sql =  
            `delete from tbl_ator where id = ${id};`
            
            let rsAtor =  await prisma.$executeRawUnsafe(sql)

            if (rsAtor) {
                sql = `SET FOREIGN_KEY_CHECKS=1;`
                
                let rsFinal = await prisma.$executeRawUnsafe(sql)

                if(rsFinal == 0){
                    return rsAtor
                }else{
                    return false
                }
               
            } else {
                return false
            }
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

const updateAtor = async function (dadosAtor) {
    try {
        let sql =

            ` update tbl_ator
                      set
                      nome = '${dadosAtor.nome}',
                      foto_ator = '${dadosAtor.foto_ator}',
                      biografia = '${dadosAtor.biografia}',
                      id_sexoA = ${dadosAtor.id_sexoA}

                      where id = ${dadosAtor.id}
        `
        let rsAtor = prisma.$executeRawUnsafe(sql)

        if (rsAtor) {
            return rsAtor
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectNacionalidadeAtor = async function (idAtor) {
    try { 
        let sql = `select * from tbl_nacionalidadeAator where id_ator = ${idAtor}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        if (rsNacionalidade) {
            let sqlNacionalidade = `select * from tbl_nacionalidadeA where id = ${rsNacionalidade[0].id_nacionalidadeA}`

            let rsFinal = await prisma.$queryRawUnsafe(sqlNacionalidade)

            if (rsFinal) {
                return rsFinal
            } else {
                return false
            }
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectFilmesAtor = async function (idAtor) {
    try {
        let sql = `select * from tbl_ator_filme where id_ator = ${idAtor}`

        let rsFilmeA = await prisma.$queryRawUnsafe(sql)

        if (rsFilmeA) {
            for (let index = 0; index < rsFilmeA.length; index++) {
                const element = rsFilmeA[index]

                let sqlFilme = `select * from tbl_filme where id = ${element.id_filme}` 

                let rsFilme = await prisma.$queryRawUnsafe(sqlFilme)

                if (rsFilme) {
                    return rsFilme
                } else {
                    return false
                }
            }

        } else {
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
    insertFilmesAtor,
    selectLastIdAtor,
    deleteAtor,
    updateAtor,
    selectNacionalidadeAtor,
    selectFilmesAtor
}