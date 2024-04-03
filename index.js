const express = require("express");
const app = express();
app.use(express.json());

const {MongoMemoryServer} = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');
const pessoa = require("./modelos/pessoa.js")

const setup = async () => {
    const mongod = await MongoMemoryServer.create();

    console.log("Banco em: ", mongod.getUri()); 
    await mongoose.connect(`${mongod.getUri()}banco`)

    app.post("/pessoa", async (req, res) =>{
        const {
            nome,
            idade,
            cpf,
            ra
        }=req.body;
        const novaPessoa = new pessoa({nome: nome, idade: idade, cpf: cpf, ra: ra});
        await novaPessoa.save();
        res.send(novaPessoa);
    });

    app.get("/pessoas", async (req, res) =>{
        const pessoas = await pessoa.find({});
        res.send(pessoas);

    })

    app.get('/', (req, res) => {
        console.log("Funcionou");
        res.send("Foi");
    });
    
    app.listen(3000, ()=>{
        console.log("Ouvindo em https://localhost:3000")
    })
}

setup();