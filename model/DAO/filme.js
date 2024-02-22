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
const insertFilme = async function(){
}

//Função para atualizar um filme no banco de dados
const updateFilme = async function(){
}

//Função para excluir um filme no banco de dados
const deleteFilme = async function(){
}

//Função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){
    let sql = 'select * from tbl_filme';
    
    //$QuerryRawUnsafe(sql)         possibilita enviar uma variavel
    //$QuerryRaw('select * from tbl_filme;')  executa o script dentro
    
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    if(rsFilmes.lenght > 0)
        return rsFilmes
    else 
        return false
}
//Função para buscar um filme no banco de dados, filtrando pelo id
const selectByIdFilme = async function(){
}

//Exportação das funções 
module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}

