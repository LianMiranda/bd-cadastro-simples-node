const {Schema} = require("mongoose");
const { default: mongoose } = require('mongoose');

const schemaPessoa = new Schema({
    nome: String,
    idade: Number,
    cpf: String, 
    ra: String
})

const modeloPessoa = mongoose.model('pessoa', schemaPessoa);

module.exports = modeloPessoa;