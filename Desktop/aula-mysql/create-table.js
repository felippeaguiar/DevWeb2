const mysql = require('mysql2');
const faker = require('faker');

const connection = mysql.createConnection({
    host: '192.168.99.100',
    port: 3336,
    user: 'root',
    password:'faesa123',
    database:'c1'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Banco de dados conectado!');
    createTableUsers(connection);
    populateUsers(connection);
});

function createTableUsers(conn){
    const sql = `CREATE TABLE IF NOT EXISTS Users
                    (id INT NOT NULL AUTO_INCREMENT,
                    nome VARCHAR(200) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(100) NOT NULL,
                    altura VARCHAR(100) NOT NULL,
                    peso VARCHAR(100) NOT NULL,
                    PRIMARY KEY (id)
                    );`
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error);
        console.log('Tabela criada com sucesso!');
    });
};

function populateUsers(conn){
    const sql = `INSERT INTO  Users(nome, email, phone, altura, peso) VALUES ?`;

    let values = [];

    for(let i=0; i<10; i++){
        let altura = "1,"+getRndInteger(50,99)+"m";
        let peso = ""+getRndInteger(50,150)+"kg";
        values.push([faker.name.findName(), faker.internet.email(), faker.phone.phoneNumber(), altura, peso]);
    }
    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Registros inseridos com sucesso!');
        conn.end();
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
