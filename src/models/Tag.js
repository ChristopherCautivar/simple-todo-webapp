class Tag {
    #id
    #dateCreated
    #dateUpdated
    title
    description
    suggestedWeight

    constructor({id = -1,
        dateCreated = "",
        dateUpdated = "",
        title = "",
        suggestedWeight = 0,
        description = ""} = {}) {
        this.#id = id
        this.#dateCreated = dateCreated
        this.#dateUpdated = dateUpdated
        this.title = title
        this.suggestedWeight = suggestedWeight
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

module.exports = Tag