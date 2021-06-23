export class Group{
    #id = -1
    // of form: 2021-06-10 01:15:19
    #dateCreated = ""
    #dateUpdated = ""
    title = ""
    description = ""
    constructor(id, dateCreated, dateUpdated, title, description){
        this.#id = id
        this.#dateCreated = dateCreated
        this.#dateUpdated = dateUpdated
        this.title = title
        this.description = description
    }
}