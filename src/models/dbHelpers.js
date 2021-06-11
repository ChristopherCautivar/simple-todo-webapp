// interacts with database through knex queries
const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development)

module.exports = {
    addTodo,
    getTodoById,
    addTag
}

async function addTodo(todo){
    const [id] = await db("todos").insert(todo);
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