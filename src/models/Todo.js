import { Tag } from "./Tag.js";

export class Todo {
    #id = -1
    // of form: 2021-06-10 01:15:19
    #dateCreated = ""
    #dateUpdated = ""
    completed = false
    title = ""
    description = ""
    tag = []
    weight = 0
    prerequisites = []
    // DateTime objects
    timeEstimate = ""
    dueDate = ""
}