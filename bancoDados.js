const mongoose = require("mongoose")

async function conectaBanco(){ //async atender varias demandas por vez
    try {
        console.log('Conexão com banco de dados iniciada')

        await mongoose.connect('mongodb+srv://nl265080:ofsoPxDfMPhzJJu6@clustermulheres.f2cufnx.mongodb.net/?retryWrites=true&w=majority')

        console.log('Conexão banco de dados feita')
    } catch(erro) {
        console.log(erro)
    }
} 

module.exports = conectaBanco

