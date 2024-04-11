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
 *      npm install prisma --save   (É responsávem pela conexão como o DB)
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

/***************************************** Import dos arquivos do controller do projeto***********************/
const controllerFilmes = require('./controller/controller_filme.js')
const controllerClassificacao = require('./controller/controller_classificacao.js')

//Criação do App
const app = express()

//Mostrar como usar o App
app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    
        app.use(cors())
    
        next()
    })

//Criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON =  bodyParser.json()

/***********************************Endpoints de Filmes*********************************************************** */

//Criação do endpoint que retorna todos os filmes do Banco de Dados
app.get('/v2/acmeFilmes/filmes',cors(),async function(request, response, next){

        //Chama a função da controller para retornar todos os filmes
        let dadosFilmes = await controllerFilmes.getListarFilmes()

        response.status(dadosFilmes.status_code)
        response.json(dadosFilmes)
})

//Criação do endpoint que retorna um filme no banco de dados filtrando pelo id 
app.get('/v2/acmeFilmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//Criação do endpoint que retorna dados de um filme filtrando pelo nome
app.get('/v2/acmeFilmes/nomefilme', cors(), async function(request, response){
    let nomeFilme = request.query.nome

    let dadosFilme = await controllerFilmes.getBuscarFilmeNome(nomeFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//Criação do endpoint que cadastra um filme no banco de dados
app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function(request, response){
   
    //Recebe o content-type com o tipo de dados encaminhado na requisição
    const contentType = request.header('content-type')
   
    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //Encaminha os dados para a controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
    
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//Criação do endpoint que deleta um filme no banco de dados filtrando pelo id
app.delete('/v2/acmeFilmes/filme/:id', cors(), async function(request, response){
    let idFilme = request.params.id

    let dadosExclusao = await controllerFilmes.setExcluirFilme(idFilme)

    response.status(dadosExclusao.status_code)
    response.json(dadosExclusao.message)
})

//Criação do endpoint que atualiza um filme filtrando pelo id
app.put('/v2/acmeFilmes/filme/:id', cors(), bodyParserJSON, async function(request, response){
    let idFilme = request.params.id

    const contentType = request.header('content-type')

    const dadosBody = request.body

    
    let resultDadosFilmeAtualizado = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

    response.status(resultDadosFilmeAtualizado.status_code)
    response.json(resultDadosFilmeAtualizado)
})

/***********************************Endpoints de Classificação*********************************************************** */
//endpoint que retorna todas as classificações do banco de dados
app.get('/v2/acmeFilmes/classificacoes', cors(), async function(request, response){
    //arquivo que aciona a controller para realizar a requisição
    let dadosClassificacacoes = await controllerClassificacao.getAllClassificacoes()

    response.status(dadosClassificacacoes.status)
    response.json(dadosClassificacacoes)
})


//Configuração para que a API use a porta 8080
app.listen('8080', function(){
  console.log('API funcionando e aguardando requisições')
})
