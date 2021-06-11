const express = require('express');
const todos = require("./models/dbHelpers")

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    todos.addTodo({
        completed: false,
        title: "this is a test",
        description: "testtesttest",
        weight: 5
    })
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message : "error adding todo"})
    })
});

app.post("/api/todos", (req, res) => {
    todos.addTodo(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message : "error adding todo"})
    })
});

app.get("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    todos.getTodoById(id)
    .then(todo => {
        if(todo){
            res.status(200).json(todo)
        } else {
            res.status(404).json({message: "todo not found"})
        }
    })
    .catch(error => {
        res.status(500).json({message : `error finding todo with id ${id} \n ${error}`})
    })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);