const express = require('express');
const todos = require("../../models/dbHelpers")

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

router.get("/:id", (req, res) => {
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

module.exports = router
