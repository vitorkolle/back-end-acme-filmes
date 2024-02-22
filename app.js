/************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação de API no projeto
 * Data: 25/01
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/
/**
 *  Para realizar a integração com o banco de dados devemos utilizar uma das seguintes bibliotecas:
 *        -SEQUELIZE    (BIBLIOTECA ANTIGA, E POSSUI MAIS CONTEUDOS EXPLICATIVOS NA WEB)
 *        -PRISMA ORM   (A BIBLIOTECA MAIS ATUAL - UTILIZADA NESSE PROJETO)
 *        -FASTFY ORM   (A BIBLIOTECA MAIS ATUAL)
 * 
 * 
 *      Para a instalação do Prisma ORM
 *      npm instal --save   (É responsávem pela conexão como o DB)
 *      npm install @prisma/client --save   (É responsavel por executar scripts SQL mo DB)
 *  
 *      Para inicializar o prisma no projeto
 * 
 *      npx prisma init
 */


//Importação das bibliotecas necessárias para o projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const controleFilmes = require ('./controller/funcoes.js')
const controllerFilmes = require('./controller/controller_filme.js')

//Criação do App
const app = express()

//Mostrar como usar o App
app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET')
    
        app.use(cors())
    
        next()
    })

//Criação do endpoint que retorna todos os filmes do Json
app.get('/v1/acmeFilmes/filmes', cors(), async function(request, response, next){
        let listaFilmes = controleFilmes.getFilmes()
    
        if(listaFilmes){
            response.json(listaFilmes)
            response.status(200)
        }
        else{
            response.status(404)
            response.json('{erro: item não encontrado}')
        }
    })

app.get('/v2/acmeFilmes/filmes',cors(),async function(request, response, next){

        //Chama a função da controller para retornar todos os filmes
        let dadosFilmes = await controllerFilmes.getListarFilmes()
    
        //Validação para verificar se existe dados a serem retornados
        if (dadosFilmes) {
            response.json(dadosFilmes)
            response.status(200)
        }else{
            response.json({message: 'Nenhum registro encontrado'})
            response.status(404)
        }
    })

//Criação do endpoint que busca um filme do Json filtrando pelo id
app.get('/v1/acmeFilmes/filme/:id', cors(), async function(request, response, next){
    let id = request.params.id

    let dadosFilme = controleFilmes.getFilme(id)

    if(dadosFilme){
        response.json(dadosFilme)
        response.status(200)
    }else{
        response.json('{erro: item não encontrado}')
        response.status(404)
    }
})


/***************************************** Import dos arquivos do controller do projeto***********************/
const controllerFilmes = require('./controller/controller_filme.js')

//Configuração para que a API use a porta 8080
app.listen('8080', function(){
  console.log('API funcionando!!!!')
})