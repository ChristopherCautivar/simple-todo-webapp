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

server.get('/app', (req, res) => {
    res.render("viewpage");
});

server.use("/api/todos", todosRouter);

module.exports = server;
