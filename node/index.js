const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root@123',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const possibleNames = [
    'Maria',
    'José',
    'João',
    'Carlos',
    'Paulo',
    'Pedro',
    'Luiz',
    'Ana',
    'Carla',
    'Paola',
    'Beatriz',
    'Marcos',
    'Lucas',
    'Mário',
    'Paula',
    'Márcio',
    'Patrícia',
    'Bruno',
    'Mateus',
    'Breno',
    'Gabriel',
    'Fábio',
    'Fabrício',
    'Rafael',
    'Leonardo',
    'Leandro'
];

const insertName = (name) => {
    const sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
}

const getNames = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT name FROM people`;
       
        connection.query(sql, (err, result) => {
            if(err) 
                return reject(err);
            
            return resolve(result);
        });
    });
}

// gera un índice aleatório do tamanho do vetor de nomes
// e obtém um nome da lista para inserir na tabela
const generateName = () => {
    const index = Math.round(Math.random() * possibleNames.length) - 1;
    return possibleNames[index >= 0 ? index : 0];
}

app.get('/', async (req, res) => {
    try {
        const name = generateName();
        insertName(name);
        const result = await getNames();

        let retorno = '<h1 style="font-family: sans-serif;">Full Cycle Rocks!</h1>';
        let list = '<ul>'
        result.forEach(dado => {
            list += `<li style="font-family: sans-serif;">${dado.name}</li>`;
        });
        list += '</ul>'
        res.send(retorno + list);
    }
    catch(err) {
        console.log(JSON.stringify(err));
        res.send('<h1 style="font-family: sans-serif;">Erro!</h1>');
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})