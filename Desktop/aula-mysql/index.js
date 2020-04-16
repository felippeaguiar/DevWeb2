const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql2');

//npm install express --save
//npm install body-parser --save

//Configurações de ambiente
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Criando um roteador
const router = express.Router();
router.get('/', (req, res) => res.json({message: 'API ok!'}));
app.use ('/', router);

function execQuery(query, res){
    const connection = mysql.createConnection({
        host: '192.168.99.100',
        port: 3336,
        user: 'root',
        password:'faesa123',
        database:'app_development'
    })

    connection.query(query, function(error, results, fields){
        if(error) res.json(error);
        else res.json(results);

        connection.end();
        console.log('Query executada com sucesso!')
    });
}

//Rotas Users
router.get('/users', (req, res) => {
    execQuery('SELECT * FROM Users;', res);
});

/*
router.post('/users', (req, res) => {
    const nome = req.body.nome.substring(0, 200);
    const email = req.body.email.substring(0, 100);
    execQuery(`INSERT INTO Users (nome, email) VALUES ('${nome})', '${email}');`, res);
}
*/
//Iniciando o servidor
app.listen(port);
console.log('API rodando');

