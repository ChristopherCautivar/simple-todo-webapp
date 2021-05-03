// setup db? have all the models here or in files too?
const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database("./database.db", (err) =>{
    if(err){
        console.log(err.message)
    }
    console.log("Connected to db in sqlite3!")

    db.close((err)=>{
        if(err){
            console.log(err.message)
        }
    })
    console.log("db connection closed")
})

