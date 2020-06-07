const express = require("express"); // Solicita o express
const server = express(); // Executa o express

// pegar o banco de dados
const db = require("./database/db.js");

// configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


// utilizando template engine
const nunjucks = require("nunjucks"); // Solicita o nunjucks
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html");
})

// configurando a rota create-point
server.get("/create-point", (req, res) => {

    //req.query: Query Strings da nossa url
    console.log(req.query);

    return res.render("create-point.html");
})


server.post("/savepoint", (req, res) => {

    // req.body: o corpo do nosso formulário
    // console.log(req.body);

    // inserir dados no banco de dados

    const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
        ) VALUES (?,?,?,?,?,?,?);
        `;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) { // Verifica se a tabela foi construída com sucesso
        if (err) {
            return console.log(err);
        }

        console.log("Cadastrado com sucesso!");
        console.log(this)

        return res.send("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);  // Insere dados na tabela


})

server.get("/search", (req, res) => {

    const search = req.query.search;

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 });
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log("Aqui estão os seus registros: ");
        console.log(rows);

        const total = rows.length;

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total });
    });


})
// 'liga' o servidor
server.listen(3000);


//npm start no terminal inicia o servidor