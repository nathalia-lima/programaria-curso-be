const express = require("express") // iniciando o express
const router = express.Router() //config primeira parte da rota

const cors = require('cors') // trazendo pacote cors q permite instalar e consumir essa api no frontend

const conectaBanco = require('./bancoDados.js') //exportando o arquivo de conexão do banco
conectaBanco() //chamando a função que conecta o banco de dados


const Mulher = require('./mulherModel.js')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 // criando a porta


//GET 
async function mostraMulheres(request, response){
    try{
        const mulheresVindasBanco = await Mulher.find()
        response.json(mulheresVindasBanco)
    }catch (erro) {
        console.log(erro)
    }
    
}

//POST 
async function criaMulher(request, response){
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }

        if (request.body.citacao){
            mulherEncontrada = request.body.citacao
        }

        const mulherAtualizadaBanco = await mulherEncontrada.save()

        response.json(mulherAtualizadaBanco)

    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response){
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ messagem: 'Mulher deletada com sucesso!'})
    }catch(erro){
        console.log(erro)
}
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