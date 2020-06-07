// configuração do banco de dados

// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose(); // verbose configura o sqlite para ver mensagens no terminal

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

// exporta o objeto db
module.exports = db;

// utilizar o objeto do banco de dados para nossas operações
// serialize() roda uma sequência de códigos
//db.serialize(() => {
    //     // Criar uma tabela com comandos SQL
    //     db.run(`
    //         CREATE TABLE IF NOT EXISTS places (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             image TEXT,
    //             name TEXT,
    //             address TEXT,
    //             address2 TEXT,
    //             state TEXT,
    //             city TEXT,
    //             items TEXT
    //         );
    //     `)

    //     // Inserir dados na tabela

    //     const query = `
    //         INSERT INTO places (
    //             image,
    //             name,
    //             address,
    //             address2,
    //             state,
    //             city,
    //             items
    //     ) VALUES (?,?,?,?,?,?,?);
    //     `;

    //     const values = [
    //         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    //         "Papersider",
    //         "Guilherme Gemballa, Jardim América",
    //         "Número 260",
    //         "Santa Catarina",
    //         "Rio do Sul",
    //         "Papéis e Papelão"
    //     ];

    //     function afterInsertData(err) { // Verifica se a tabela foi construída com sucesso
    //         if (err) {
    //             return console.log(err);
    //         }

    //         console.log("Cadastrado com sucesso!");
    //         console.log(this)
    //     }

    //     db.run(query, values, afterInsertData);  // Insere dados na tabela

    //     // // Consultar os dados da tabela
    //     // db.all(`SELECT * FROM places`, function (err, rows) {
    //     //     if (err) {
    //     //         return console.log(err);
    //     //     }

    //     //     console.log("Aqui estão seus registros!");
    //     //     console.log(rows);
    //     // })

    // Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("Registro deletado com sucesso!");
    // });


//});
