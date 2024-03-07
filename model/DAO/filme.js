/************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao banco de dados MySql, aqui faremos o CRUD na tabela de filmes
 * Data: 01/02
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

//Import da biblioteca do prisma client
const {PrismaClient} = require('@prisma/client');
 
//Instancia da classe prisma client
const prisma = new PrismaClient()

//Função para inserir um filme no banco de dados
const insertFilme = async function(dadosFilme){
    try {

    let sql

    if(dadosFilme.data_relancamento != '' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined){
        sql = `insert into tbl_filme( 
            nome,
            sinopse,
            duracao,
            data_lancamento,
            data_relancamento,
            foto_capa,
            valor_unitario
   )values(
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.duracao}',
            '${dadosFilme.data_lancamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
)`
   }else{
    sql = `insert into tbl_filme( 
        nome,
        sinopse,
        duracao,
        data_lancamento,
        data_relancamento,
        foto_capa,
        valor_unitario
)values(
        '${dadosFilme.nome}',
        '${dadosFilme.sinopse}',
        '${dadosFilme.duracao}',
        '${dadosFilme.data_lancamento}',
         null,
        '${dadosFilme.foto_capa}',
        '${dadosFilme.valor_unitario}'
)`
   }
   //executeRawUnsafe() = serve para executar scripts sem retorno de dados
      //(insert, update, delete)
   //queryRawUnsafe() = serve para executar scripts com retorno de dados
     //(select)
   let result = await prisma.$executeRawUnsafe(sql)
 
   if(result){
     return true
   }else{
     return false
   }
  } catch (error) {
      return false        
    }
        
}

//Função para atualizar um filme no banco de dados
const updateFilme = async function(){
}

//Função para excluir um filme no banco de dados
const deleteFilme = async function(){
}

//Função para reeber o id do último filme cadastrado
const selectIdLastFilme = async function(){
    try {
        let sql = 'select cast(last_insert_id() as decimal) as id from tbl_filme limit 1'

        let rsIdFilme = await prisma.$queryRawUnsafe(sql)
        return rsIdFilme
        
    } catch (error) {
        return false        
    }
}

//Função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){
    try {
    let sql = 'select * from tbl_filme';
    
    //$QuerryRawUnsafe(sql)         possibilita enviar uma variavel
    //$QuerryRaw('select * from tbl_filme;')  executa o script dentro
    
    let rsFilmes = await prisma.$queryRawUnsafe(sql)
    return rsFilmes
    
    } catch (error) {
        return false        
    }
}

//Função para buscar um filme no banco de dados, filtrando pelo id
const selectByIdFilme = async function(id){
    try {
    //Script Sql para filtrar pelo id
    let sql = `select * from tbl_filme where id = ${id}`

    //Executa o Sql no banco de dados
    let rsFilme = await prisma.$queryRawUnsafe(sql)

    return rsFilme

    } catch (error) {
        return false
    }
    
}

//Função para buscar um filme no banco de dados, filtrando pelo nome
const selectByNomeFilme = async function(nome){
    try {
        let sql = `select * from tbl_filme where tbl_filme.nome LIKE "%${nome}%"` 

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
        
    } catch (error) {
        return false
        
    }
}

//Exportação das funções 
module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme,
    selectIdLastFilme
}

