class Todo {
    /*
        make any fields that are managed by the database private,
        including the ease of use lists of tags and prerequisites stored within
        the object. I am still unsure if having these objects within will
        complicate lazy loading techniques.
    */
    #id
    // of form: 2021-06-10 01:15:19
    #dateCreated
    #dateUpdated
    title
    // sqlite3 uses 0 and 1 for false and true
    completed
    description
    #tags
    weight
    #prerequisites
    // DateTime objects
    time_estimate
    due_date

    //use destructuring and default values to allow both a parameterized and default constructor
    constructor({id = -1,
        dateCreated = "",
        dateUpdated = "",
        completed = 0,
        title = "",
        description = "",
        tags = [],
        weight = 0,
        prerequisites = [],
        time_estimate = "",
        due_date = ""} = {}) {
        this.#id = id;
        this.#dateCreated = dateCreated;
        this.#dateUpdated = dateUpdated;
        this.title = title;
        this.completed = completed;
        this.description = description;
        this.#tags = tags;
        this.weight = weight;
        this.#prerequisites = prerequisites;
        this.time_estimate = time_estimate;
        this.due_date = due_date;
    }

    // if necessary, these normally database-managed fields can be accessed

    getId(){
        return this.#id;
    }

    getTags(){
        return this.#tags;
    }

    getPrerequisites(){
        return this.#prerequisites;
    }

    getDateCreated(){
        return this.#dateCreated;
    }

    getDateUpdated(){
        return this.#dateUpdated;
    }
    
    // TODO: Would it be a good idea to use private async functions to make knex calls
    // and queries in order to construct tag and prerequisite lists?
}

module.exports = Todo