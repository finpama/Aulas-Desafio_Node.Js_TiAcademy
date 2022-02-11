const express = require('express');
const cors = require('cors');
const models = require('./models');

const { Sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

let compra = models.Compra;
let itemCompra = models.ItemCompra;
let produto = models.Produto;

console.clear()


app.get('/', function (req, res) {
	res.send('<h1>hello world!</h1>')
});

app.post('/servico/novo', async (req, res) => {
	await servico.create(req.body)
		.then(function () {
			return res.json({
				"message": "O serviço foi criado com sucesso"
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "O serviço não foi criado",
				"errorMessage": err
			});
		});
});
app.post('/cliente/novo', async (req, res) => {
	await cliente.create(req.body)
		.then(function (err) {
			return res.json({
				"message": "O cliente foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "O cliente NÃO foi criado",
				"errorMessage": err
			});
		});
});
app.post('/pedido/novo', async (req, res) => {
	await pedido.create(req.body)
		.then(function (err) {
			return res.json({
				"message": "O Pedido foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "O Pedido NÃO foi criado",
				"errorMessage": err
			});
		});
});
app.post('/item/novo', async (req, res) => {
	await itemPedido.create(req.body)
		.then(function () {
			return res.json({
				"error": false,
				"message": "O item foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.json({
				"error": true,
				"message": "O item NÃO foi criado",
				"logMessage": err
			});
		});
});

app.get('/servico/lista', async (req, res) => {
	await servico.findAll({       //https://sequelize.org/master/manual/model-querying-basics.html
		order: [['id', 'ASC']]  //                 ------------------------>                    /\#ordering-and-grouping 
	})
		.then(function (servicos) {
			res.json({ servicos })
		})
		.catch(err => {
			res.json({
				error: true,
				message: err
			})
		});
});
app.get('/servico/quantia', async (req, res) => {
	await servico.count('id')
		.then(function (servicos) {
			res.json({ servicos });
		});
});
app.get('/servico/:id/pedidos', async (req, res) => {
	await itemPedido.findAll({ where: { ServicoId: req.params.id } })
		.then((itemPedido) => {
			if (itemPedido != null) {
				res.json({
					"error": false,
					itemPedido
				});
			} else {
				res.json({
					"error": true,
					"message": "Serviço não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.get('/pedido/:id/items-pedidos', async (req, res) => {
	await itemPedido.findAll({ where: { PedidoId: req.params.id } })
		.then((itemPedido) => {
			if (itemPedido != null) {
				res.json({
					"error": false,
					itemPedido
				});
			} else {
				res.json({
					"error": true,
					"message": "Pedido não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.get('/cliente/:id/pedidos', async (req, res) => {
	await pedido.findAll({ where: { ClienteId: req.params.id } })
		.then((pedido) => {
			if (pedido != null) {
				res.json({
					"error": false,
					pedido
				});
			} else {
				res.json({
					"error": true,
					"message": "Cliente não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.get('/servico/:id', async (req, res) => {
	await servico.findByPk(req.params.id, { include: ['sItens'] })
		.then((itemPedido) => {
			if (itemPedido != null) {
				res.json({
					"error": false,
					itemPedido
				});
			} else {
				res.json({
					"error": true,
					"message": "Serviço não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.get('/cliente/lista', async (req, res) => {
	await cliente.findAll({
		order: [['createdAt', 'ASC']]
	})
		.then(function (clientes) {
			res.json({ clientes })
		})
		.catch(err => {
			res.json({
				error: true,
				message: err
			})
		})
})
app.get('/cliente/quantia', async (req, res) => {
	await cliente.count('id')
		.then(function (clientes) {
			res.json({ clientes });
		});
});
app.get('/cliente/:id', async (req, res) => {
	await cliente.findByPk(req.params.id, { include: [{ all: true }] })
		.then((cliente) => {
			if (cliente != null) {
				res.json({
					"error": false,
					cliente
				});
			} else {
				res.json({
					"error": true,
					"message": "Cliente não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.get('/pedido/lista', async (req, res) => {
	await pedido.findAll({
		order: [['id', 'ASC']]
	})
		.then(function (pedidos) {
			res.json({ pedidos })
		});
})
app.get('/pedido/quantia', async (req, res) => {
	await pedido.count('id')
		.then(function (pedidos) {
			res.json({ pedidos });
		});
});
app.get('/pedido/:id', async (req, res) => {
	await pedido.findByPk(req.params.id, {
		include: ['pCliente', 'pItens']
	})
		.then((pedido) => {
			if (pedido != null) {
				return res.json({
					"error": false,
					pedido
				});
			} else {
				return res.json({
					"error": true,
					"message": "pedido não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});

app.put('/atualizar/servico/:id', async (req, res) => {
	await servico.update(req.body, {
		where: { id: req.params.id }
	})
		.then(() => {
			return res.json({
				"error": false,
				"message": "servico atualizado"
			});
		})
		.catch(err => {
			return res.status(400).json({
				"error": true,
				"message": err
			});
		});
});
app.put('/atualizar/cliente/:id', async (req, res) => {
	await cliente.update(req.body, {
		where: { id: req.params.id }
	})
		.then(() => {
			return res.json({
				"error": false,
				"message": "Cliente atualizado"
			});
		})
		.catch(err => {
			return res.status(400).json({
				"error": true,
				"message": err
			});
		});
});
app.put('/atualizar/item/pedido/:PedidoId/servico/:ServicoId', async (req, res) => {
	const item = {
		quantidade: req.body.quantidade,
		valor: req.body.valor
	}

	if (!await pedido.findByPk(req.params.PedidoId)) {
		return res.status(400).json({
			"error": true,
			"message": " O pedido não foi encotrado"
		});
	}

	if (!await servico.findByPk(req.params.ServicoId)) {
		return res.status(400).json({
			"error": true,
			"message": "O servico não foi encontrado"
		});
	}

	await itemPedido.update(item, {
		where: Sequelize.and(
			{ ServicoId: req.params.ServicoId },
			{ PedidoId: req.params.PedidoId }
		)
	})
		.then(() => {
			res.json({
				error: false,
				message: "O Pedido foi alterado com sucesso",
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: "Erro: Não foi possivel alterar"
			});
		});
});

app.delete('/cliente/:id/excluir', async (req, res) => {
	await cliente.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.json({
				error: false,
				message: "O cliente foi excluido com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});
app.delete('/servico/:id/excluir', async (req, res) => {
	await servico.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.json({
				error: false,
				message: "O serviço foi excluido com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});
app.delete('/pedido/:id/excluir', async (req, res) => {
	await pedido.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.json({
				error: false,
				message: "O serviço foi excluido com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});
app.delete('/item-pedido/:PedidoId/:ServicoId/excluir', async (req, res) => {
	await itemPedido.destroy({
		where: {
			PedidoId: req.params.PedidoId,
			ServicoId: req.params.ServicoId
		}
	})
		.then(() => {
			res.json({
				error: false,
				message: "O itemPedido foi excluido com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});



app.post('/compra/novo', async (req, res) => {
	await compra.create(req.body)
		.then(function (err) {
			return res.json({
				"message": "A compra foi criada com sucesso",
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "A compra NÃO foi criada",
				"errorMessage": err
			});
		});
});
app.get('/cliente/:id/compras', async (req, res) => {
	await compra.findAll({ where: { ClienteId: req.params.id } })
		.then((compras) => {
			if (compras != null) {
				res.json({
					"error": false,
					compras
				});
			} else {
				res.json({
					"error": true,
					"message": "Cliente não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.delete('/compra/:id/excluir', async (req, res) => {
	await compra.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.json({
				error: false,
				message: "A Compra foi excluida com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});


app.post('/item-compra/novo', async (req, res) => {
	await itemCompra.create(req.body)
		.then(function () {
			return res.json({
				"error": false,
				"message": "O item foi criado com sucesso",
			})
		})
		.catch(function (err) {
			return res.json({
				"error": true,
				"message": "O item NÃO foi criado",
				"logMessage": err
			});
		});
});
app.get('/compra/:id/itens', async (req, res) => {
	await itemCompra.findAll({ where: { CompraId: req.params.id } })
		.then((itemCompra) => {
			if (itemCompra != null) {
				res.json({
					"error": false,
					itemCompra
				});
			} else {
				res.json({
					"error": true,
					"message": "Compra não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.put('/atualizar/item/compra/:CompraId/produto/:ProdutoId', async (req, res) => {
	const item = {
		quantidade: req.body.quantidade,
		valor: req.body.valor
	}

	if (!await compra.findByPk(req.params.CompraId)) {
		return res.status(400).json({
			"error": true,
			"message": " O compra não foi encotrado"
		});
	}

	if (!await produto.findByPk(req.params.ProdutoId)) {
		return res.status(400).json({
			"error": true,
			"message": "O produto não foi encontrado"
		});
	}

	await itemCompra.update(item, {
		where: Sequelize.and(
			{ ProdutoId: req.params.ProdutoId },
			{ CompraId: req.params.CompraId }
		)
	})
		.then(() => {
			res.json({
				error: false,
				message: "O Compra foi alterado com sucesso",
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: "Erro: Não foi possivel alterar"
			});
		});
});
app.delete('/item-compra/:CompraId/:ProdutoId/excluir', async (req, res) => {
	await itemCompra.destroy({ 
		where: { 
			CompraId: req.params.CompraId,
			ProdutoId: req.params.ProdutoId
		} 
	})
		.then(() => {
			res.json({
				error: false,
				message: "O itemCompra foi excluido com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});


app.post('/produto/novo', async (req, res) => {
	await produto.create(req.body)
		.then(function () {
			return res.json({
				"message": "O produto foi criado com sucesso"
			})
		})
		.catch(function (err) {
			return res.status(400).json({
				"message": "O produto não foi criado",
				"errorMessage": err
			});
		});
});
app.get('/produto/lista', async (req, res) => {
	await produto.findAll({       //https://sequelize.org/master/manual/model-querying-basics.html
		order: [['id', 'ASC']]  //                 ------------------------>                    /\#ordering-and-grouping 
	})
		.then(function (produtos) {
			res.json({ produtos });
		})
		.catch(err => {
			res.json({
				error: true,
				message: err
			})
		});
});
app.get('/produto/:id/compras', async (req, res) => {
	await itemCompra.findAll({ where: { ProdutoId: req.params.id } })
		.then((itemCompra) => {
			if (itemCompra != null) {
				res.json({
					"error": false,
					itemCompra
				});
			} else {
				res.json({
					"error": true,
					"message": "Produto não encontrado"
				});
			}
		})
		.catch(err => {
			res.json({
				"error": true,
				"message": err
			});
		});
});
app.put('/atualizar/produto/:id', async (req, res) => {
	await produto.update(req.body, {
		where: { id: req.params.id }
	})
		.then(() => {
			return res.json({
				"error": false,
				"message": "produto atualizado"
			});
		})
		.catch(err => {
			return res.status(400).json({
				"error": true,
				"message": err
			});
		});
});
app.delete('/produto/:id/excluir', async (req, res) => {
	await produto.destroy({ where: { id: req.params.id } })
		.then(() => {
			res.json({
				error: false,
				message: "O produto foi excluido com sucesso"
			});
		})
		.catch(err => {
			res.status(400).json({
				error: true,
				message: err
			});
		});
});



let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
	console.log(`Servidor ativo em: http://localhost:3001`);
});
