const express = require('express');
const cors = require('cors');
const models = require('./models')

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;



app.get('/', function (req, res) {
	res.send('<h1>hello world!</h1>')
});

app.post('/new/servico', async (req, res) => {
	await servico.create(req.body)
		.then(function () {
			return res.json({
				"error": false,
				"message": "(V) O serviço foi criado com sucesso"
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"error": true,
				"message": "(X) O serviço não foi criado"
			});
		});
});


app.post('/new/cliente', async (req, res) => {
	await cliente.create(req.body)
		.then(function (err) {
			return res.json({
				"error": false,
				"message": "(V) O cliente foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"error": true,
				"message": "(X) O cliente NÃO foi criado",
				"errorMessage": err
			});
		});
});

app.post('/new/pedido', async (req, res) => {
	await pedido.create(req.body)
		.then(function (err) {
			return res.json({
				"error": false,
				"message": "(V) O Pedido foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"error": true,
				"message": "(X) O Pedido NÃO foi criado",
				"errorMessage": err
			});
		});
});




let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
	console.log(`Servidor ativo: http://localhost:3001`);
});