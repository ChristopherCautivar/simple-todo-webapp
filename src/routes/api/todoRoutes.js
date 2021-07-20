const express = require('express');
const todos = require("../../models/dbHelpers")
const Todo = require("../../models/Todo")

const router = express.Router()
router.use(express.urlencoded({extended:true}))

// since server already uses this router, all paths are relative to the parameter given in server
router.post("/add", (req, res) => {
    // send req.body object to dbhelpers addTodo
    todos.addTodo(req.body)
    .then(todo => {
        res.status(200).json(todo)
    })
    .catch(error => {
        // handles any error dbhelpers encounters
        res.status(500).json({message : `error adding todo: ${error}`})
        console.log(error)
    })
});

router.get("/getById/:id", (req, res) => {
    const { id } = req.params;
    todos.getTodoById(id)
    .then(todo => {
        if(todo){
            res.status(200).json([new Todo(todo)])
        } else {
            res.status(404).json({message: "todo not found"})
        }
    })
    .catch(error => {
        res.status(500).json({message : `error finding todo with id ${id} \n ${error}`})
    })
});

router.get("/getAll", (req,res) => {
    // TODO: eventually import limit from user config
    const limit = 40;
    todos.getAllTodos(limit)
    .then(arr => {
        formatted = {}
        arr.forEach(t => {
            formatted[`${t["id"]}`] = new Todo(t)
        })
        formatted["count"] = arr.length
        res.status(200).json(formatted);
    })
})

router.get("/getClass", (req,res) => {
    res.status(200).send(new Todo());
})

router.get("/testData", (req,res) => {
    // send test objects when endpoint is hit
    todo1 = new Todo({id : 1,
        dateCreated : "",
        dateUpdated : "",
        completed : false,
        title : "test",
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
        title : "test2",
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
