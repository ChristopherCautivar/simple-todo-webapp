const express = require('express');
const todos = require("../../models/dbHelpers")
const Todo = require("../../models/Todo")

const router = express.Router()

// since server already uses this router, all pathes are relative to the parameter given in server
router.post("/", (req, res) => {
    todos.addTodo(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message : "error adding todo"})
    })
});

router.get("/getById/:id", (req, res) => {
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

router.get("/testData", (req,res) => {
    // Test Objects
    todo1 = new Todo({id : 1,
        dateCreated : "",
        dateUpdated : "",
        completed : false,
        title : "",
        description : "",
        tags : [],
        weight : 0,
        prerequisites : [],
        timeEstimate : "",
        dueDate : ""})
    todo2 = new Todo({id : 2,
        dateCreated : "",
        dateUpdated : "",
        completed : false,
        title : "",
        description : "",
        tags : [],
        weight : 0,
        prerequisites : [],
        timeEstimate : "",
        dueDate : ""})
    todo3 = new Todo()
    testTodos = [todo1,todo2,todo3]
    formatted = {}
    testTodos.forEach(t => {
        formatted[`${t.getId()}`] = t
    });
    res.status(200).send(formatted)
})

module.exports = router
