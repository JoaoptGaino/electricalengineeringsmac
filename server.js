var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
var hbs = require('express-handlebars');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "eletric",
    port: '3308'
});

const SELECT = 'SELECT * FROM piloto'
var app = express();


/* app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars'); */

app.use(session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* app.get('/', (request, response) => response.render('index', {
    title: 'SMAC'
})); */

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/public'));
})

app.post("/auth", function (request, response) {
    var username = request.body.login;
    var password = request.body.senha;

    if (username && password) {
        connection.query(
            "SELECT * FROM usuarios WHERE login = ? AND senha = ?",
            [username, password],
            function (error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect("/home");
                } else {
                    response.send("Incorrect Username and/or Password!");
                }
                response.end();
            }
        );
    } else {
        response.send("Please enter Username and Password!");
        response.end();
    }
});
app.get('/products',(req,res)=>{
    connection.query(SELECT,(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data:results
            });
        }
    });
});
app.get('/home', (request, response) => {
    if (request.session.loggedin) {
        execSQLQuery('SELECT * FROM piloto',response);
        /* response.send("Olá, " + request.session.username); */
        //response.sendFile(path.join(__dirname + '/public' + '/home.html'));
    } else {
        response.send('Logar para ver a página');
    }
    response.end();
})
app.listen(3000);