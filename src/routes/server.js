const express = require('express');
const todos = require("../models/dbHelpers")
const todosRouter = require("./api/todoRoutes")

// App
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send("Hello World!")
});

server.use("/api/todos", todosRouter)

module.exports = server
