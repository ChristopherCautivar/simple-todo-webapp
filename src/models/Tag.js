class Tag {
    #id = -1
    #dateCreated = ""
    #dateUpdated = ""
    title = ""
    suggestedWeight = 0
    description = ""

    constructor(id,dateCreated,dateUpdated,title,suggestedWeight,description){
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
}

module.exports = Tag