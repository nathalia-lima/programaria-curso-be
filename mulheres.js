const express = require("express") // iniciando o express
const router = express.Router() //config primeira parte da rota
const { v4: uuidv4 } = require('uuid');

const conectaBanco = require('./bancoDados.js') //exportando o arquivo de conexão do banco
conectaBanco() //chamando a função que conecta o banco de dados

const app = express() //iniciando o app
app.use(express.json())
const porta = 3333 // criando a porta

//lista inical de mulheres
const mulheres = [
    {
        id: '1',
        nome: 'Nathalia',
        imagem: 'exemplo',
        minibio: 'estudante'
    },
    {
        id: '2',
        nome: 'Danielle',
        imagem: 'exemplo',
        minibio: 'donita'
    },
    {
        id: '3',
        nome: 'Silvana',
        imagem: 'exemplo',
        minibio: 'mamis'
    }
]

//GET 
function mostraMulheres(request, response){
    response.json(mulheres)
}

//POST 
function criaMulher(request, response){
    const novaMulher ={
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }
    mulheres.push(novaMulher)
    response.json(mulheres)
}

//PATCH
function corrigeMulher(request, response){
    function encontraMulher(mulher){
        if (mulher.id === request.params.id){
            return mulher
        }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)

    if(request.body.nome){
        mulherEncontrada.nome = request.body.nome
    }
    if(request.body.minibio){
        mulherEncontrada.minibio = request.body.minibio
    }
    if(request.body.imagem){
        mulherEncontrada.imagem = request.body.imagem
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher(request, response){
    function todasMenosEla(mulher){
        if(mulher.id !== request.params.id){
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicam)
}

//PORTA
function mostraPorta(){
    console.log('Servidor criado e rodando na porta', porta)
}

app.use(router.delete('/mulheres/:id', deletaMulher)) //config rota DELETE
app.use(router.patch('/mulheres/:id', corrigeMulher)) //config rota PATCH
app.use(router.get('/mulheres', mostraMulheres)) //config rota get /mulheres
app.use(router.post('/mulheres', criaMulher)) //cnfig rota post /mulheres
app.listen(porta, mostraPorta ) //servidor ouvindo a porta