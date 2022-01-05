import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', function (req, res) {
    res.send('<h1>hello world!</h1><a href="/clientes">clientes</a>')
});

app.get('/clientes', function (req, res) {
    res.send('Seja bem-vindo(a) a servicesTI')
});

let port = process.env.PORT || 3001;

app.listen(port, (req, res)=>{
    console.log(`Servidor ativo: http://localhost:3001`);
});