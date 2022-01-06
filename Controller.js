const express = require('express');
const cors = require('cors');
const models = require('./models')

const app = express();
app.use(cors());

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;



app.get('/', function (req, res) {
    res.send('<h1>hello world!</h1>')
});

app.get('/servicos', async(req, res) => {
    await servico.create({
        nome: "HTML/CSS",
        descricao: "Páginas estáticas estilizadas",
        createAt: new Date(),
        updateAt: new Date()
    });
    res.send('Servico criado com sucesso!')
});

app.get('/clientes', function (req, res) {
    res.send('Seja bem-vindo(a) a servicesTI')
});



let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log(`Servidor ativo: http://localhost:3001`);
});