import { Tag } from "./Tag.js";

export class todo {
    get defaults() {
        return {
            Id: -1,
            content: "",
            title: "",
            weight: "",
            timeEstimate: new Date(0, 0, 0, 1, 30, 0, 0),
            created: new Date(),
            due: new Date()
        };
    }
}