const express = require('express');
const cors = require('cors')
const {Sequelize} = require('./models');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let pedido = models.Pedido;
let servico = models.Servico;
let itempedido = models.ItemPedido;

app.get('/', function(req,res){
    res.send('Olá mundo!');
});

app.post('/cliente', async(req, res)=>{
    await cliente.create(
        req.body
    ).then(cli =>{
        return res.json({
            error: false,
            message: "Cliente foi inserido com sucesso.",
            cli
        })        
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o cliente."
        });
    });
});

app.post('/cliente/:id/pedido', async(req, res)=>{
    const ped = {
        data: req.body.data,
        ClienteId: req.params.id
    };

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.create(ped)
    .then(order=>{
        return res.json({
            error: false,
            message: "Pedido inserido com sucesso.",
            order
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível inserir o pedido."
        });
    });
});

//alterar os dados do pedido
app.put('/pedido/:id', async (req, res) => {
    const ped = {
        id: req.params.id,
        ClienteId: req.body.ClienteId,
        data: req.body.data
    };

    if (!await cliente.findByPk(req.body.ClienteId)){
        return res.status(400).json({
            error: true,
            message: 'Cliente não existe.'
        });
    };

    await pedido.update(ped,{
        where: Sequelize.and({ClienteId: req.body.ClienteId},
            {id: req.params.id})
    }).then(pedidos=>{
        return res.json({
            error: false,
            mensagem: 'Pedido foi alterado com sucesso.',
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

//obter pedidos
app.get('/pedido/:id', async(req, res) =>{  
    pedido.findByPk(req.params.id)
    .then(pedido =>{
      return res.json({
        error: false,
        pedido
      });
    }).catch(function(erro){
      return res.status(400).json({
        error: true,
        message: "Erro: não foi possível acessar a API!"
      });
    });
  });

app.get('/clientes', async(req, res)=>{
    await cliente.findAll()
    .then(cli =>{
        return res.json({
            error: false,
            cli
        });
    })
    .catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Erro de conexão"
        });
    });
});

app.get('/clientes-pedidos', async(req, res)=>{
    await cliente.findAll({include:[{all:true}]})
    .then(cli=>{
        return res.json({
            error: false,
            cli
        })
    })
});

app.get('/cliente/:id/pedidos', async(req, res)=>{
    await pedido.findAll({
        where: {ClienteId: req.params.id}
    }).then(pedidos=>{
        return res.json({
            error: false,            
            pedidos
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.get('/excluircliente/:id', async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso."
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Erro: impossível excluir cliente."
        });
    });
});

let port = process.env.PORT || 3001;

app.listen(port, (req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});