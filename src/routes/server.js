const express = require('express');
const todosRouter = require("./api/todoRoutes")

// App
const server = express();
server.use(express.json());
server.set("views", __dirname + "/views")
server.set("view engine", "ejs");

server.get('/', (req, res) => {
    res.render("homepage");
});

server.get('/mockup', (req, res) => {
    res.render("mockup");
});

server.get('/app', (req, res) => {
    res.render("app");
});

server.use("/api/todos", todosRouter);

module.exports = server;
