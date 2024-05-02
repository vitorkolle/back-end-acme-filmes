/**********************************************************************************************************************
 * Autor: Vitor Paes Kolle
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de diretores
 * Data: 25/04
 * Versão: 1.0 
 *********************************************************************************************************************/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const selectALlDiretores = async function () {
    try {
        let sql = 'select * from tbl_diretor'

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        if (rsDiretor) {
            return rsDiretor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexoD where id = ${id}`

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

const selectNacionalidadeDiretor = async function (idDiretor) {
    try {
        let sql = `select * from tbl_nacionalidadeD_diretor where id_diretor = ${idDiretor}`

        let rsNacionalidade = await prisma.$queryRawUnsafe(sql)

        if (rsNacionalidade) {
            let sqlNacionalidade = `select * from tbl_nacionalidadeD where id = ${rsNacionalidade[0].id_nacionalidadeD}`

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

const selectFilmesDiretor = async function (idDiretor) {
    try {
        let sql = `select * from tbl_diretor_filme where id_diretor = ${idDiretor}`

        let rsFilmeD = await prisma.$queryRawUnsafe(sql)


        if (rsFilmeD) {
            for (let index = 0; index < rsFilmeD.length; index++) {
                const element = rsFilmeD[index]

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

const selectBuscarDiretor = async function (id) {
    try {
        let sql = `select * from tbl_diretor where id = ${id}`

        let rsDiretor = await prisma.$queryRawUnsafe(sql)

        if (rsDiretor) {
            return rsDiretor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectLastIdDiretor = async function () {
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_diretor limit 1'

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

const insertDiretor = async function (dadosDiretor) {
    try {
        let sql = ` insert into tbl_diretor(
                nome,
                foto_diretor,
                biografia,
                data_nascimento,
                id_sexoD
            )values(
                '${dadosDiretor.nome}',
                '${dadosDiretor.foto_diretor}',
                '${dadosDiretor.biografia}',
                '${dadosDiretor.data_nascimento}',
                ${dadosDiretor.id_sexoD}
            )`

        let rsDiretor = await prisma.$executeRawUnsafe(sql)

        if (rsDiretor) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const insertFilmesDiretor = async function (id_filme, id_diretor) {
    try {
        let sql = `insert into tbl_diretor_filme

        (
            id_diretor,
            id_filme
        )
          values(
            ${id_diretor},
            ${id_filme}
          )`

        let rsDiretorFilme = await prisma.$executeRawUnsafe(sql)

        if (rsDiretorFilme) {
            let sqlFilmes = `select * from tbl_filme where id = ${id_filme}`

            let rsFilme = await prisma.$queryRawUnsafe(sqlFilmes)

            if (rsFilme) {
                return rsFilme
            } else {
                return false
            }
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteDiretor = async function (id) {
    try {
        let sql =
         `delete from tbl_diretor where id = ${id};`

        let rsDiretor = await prisma.$executeRawUnsafe(sql)

        if (rsDiretor) {
            return rsDiretor
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports = {
    selectALlDiretores,
    selectSexo,
    selectNacionalidadeDiretor,
    selectFilmesDiretor,
    selectBuscarDiretor,
    selectLastIdDiretor,
    insertDiretor,
    insertFilmesDiretor,
    deleteDiretor
}