const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*')

        response.header('Access-Control-Allow-Methods', 'GET')
    
        app.use(cors())
    
        next()
    })

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

app.listen('8080', function(){
  console.log('API funcionando!!!!')
})