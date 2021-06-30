class Group{
    #id
    // of form: 2021-06-10 01:15:19
    #dateCreated
    #dateUpdated
    title
    description

    //use destructuring and default values to allow both a parameterized and default constructor
    constructor({id = -1,
        dateCreated = "",
        dateUpdated = "",
        title = "",
        description = ""} = {}) {
        this.#id = id
        this.#dateCreated = dateCreated
        this.#dateUpdated = dateUpdated
        this.title = title
        this.description = description
    }

    getId(){
        return this.#id
    }

    getDateCreated(){
        return this.#dateCreated;
    }

    getDateUpdated(){
        return this.#dateUpdated;
    }
}

module.exports = Group