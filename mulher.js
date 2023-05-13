const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: 'Nathalia',
        imagem: 'https://www.purarteadesivos.com.br/wp-content/uploads/2016/08/adesivo-personalizado-gatinha-marie-perfil-sticker-decorativo-de-paredes-menina-mundo-rosa-pura-arte-adesivos.png',
        minibio: 'estudante'

    })
}

function mostraPorta(){
    console.log('Servidor criado e rodando na porta', porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta )