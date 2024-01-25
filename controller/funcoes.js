var filmes = require('../modulo/filmes.js')

const getFilmes = function(){
    const arrayFilmes = []
    const jsonfilmes = {}
    let status = false
    
    filmes.filmes.filmes.forEach(filmesA => {
        arrayFilmes.push(filmesA)       
        status = true        
    });
    jsonfilmes.filmes = arrayFilmes

   
   if(filmes){
    return jsonfilmes
   }else{
    return false
   }
}

