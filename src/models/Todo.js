class Todo {
    #id
    // of form: 2021-06-10 01:15:19
    #dateCreated
    #dateUpdated
    completed
    title
    description
    tags
    weight
    prerequisites
    // DateTime objects
    timeEstimate
    dueDate

    //use destructuring and default values to allow both a parameterized and default constructor
    constructor({id = -1,
        dateCreated = "",
        dateUpdated = "",
        completed = false,
        title = "",
        description = "",
        tags = [],
        weight = 0,
        prerequisites = [],
        timeEstimate = "",
        dueDate = ""} = {}) {
        this.#id = id
        this.#dateCreated = dateCreated
        this.#dateUpdated = dateUpdated
        this.completed = completed
        this.title = title
        this.description = description
        this.tags = tags
        this.weight = weight
        this.prerequisites = prerequisites
        this.timeEstimate = timeEstimate
        this.dueDate = dueDate
    }

    getId(){
        return this.#id
    }
}

module.exports = Todo