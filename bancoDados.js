const mongoose = require("mongoose")

require('dotenv').config()

async function conectaBanco(){ //async atender varias demandas por vez
    try {
        console.log('Conexão com banco de dados iniciada')

        await mongoose.connect(process.env.MONGO_URL)

        console.log('Conexão banco de dados feita')
    } catch(erro) {
        console.log(erro)
    }
} 

module.exports = conectaBanco

