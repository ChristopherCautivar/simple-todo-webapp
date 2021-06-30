// interacts with database through knex queries
const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development)
const Todo = require("./Todo")

module.exports = {
    addTodo,
    getTodoById,
    addTag
}

async function addTodo(todo){
    // receives req.body and converts it to a new todo
    // note that any private fields are ignored when knex
    // tries to add them to the database
    // TODO: add logic if todo.getId = -1, update, else insert new
    const [id] = await db("todos").insert(new Todo(todo));
    return id;
}

async function getTodoById(id){
    return await db("todos")
    .where("id", id)
    .first();
}

async function addTag(tag){
    const [id] = await db("tags").insert(tag);
}