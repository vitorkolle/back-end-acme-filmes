/************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação de API no projeto
 * Data: 25/01
 * Autor: Vitor Paes Kolle
 * Versão: 1.0 
 ***********************************************************************************************************/

//Importação das bibliotecas necessárias para o projeto
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Criação do App
const app = express()

//Mostrar como usar o App
app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET')
    
        app.use(cors())
    
        next()
    })

//Criação do endpoint que retorna todos os filmes
app.get('/v1/acmeFilmes/filmes', cors(), async function(request, response, next){
        let controleFilmes = require('./controller/funcoes.js')
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

//Criação do endpoint que busca um filme filtrando pelo id
app.get('/v1/acmeFilmes/filme/:id', cors(), async function(request, response, next){
    let id = request.params.id

    let controleFilme = require('./controller/funcoes.js')
    let dadosFilme = controleFilme.getFilme(id)

    if(dadosFilme){
        response.json(dadosFilme)
        response.status(200)
    }else{
        response.json('{erro: item não encontrado}')
        response.status(404)
    }
})

//Configuração para que a API use a porta 8080
app.listen('8080', function(){
  console.log('API funcionando!!!!')
})