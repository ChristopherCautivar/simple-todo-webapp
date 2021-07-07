function makeEntityElement(entity, editFields){
    result = "";
    for(var property in entity){
        // private properties should not be included in this for loop
        // if editFields, also return the corresponding form or input type to allow the user to submit an ajax call
        // to create/update the field. ex. textbox or datepicker
    }
    return result;
}

function makeElement(cssClass, id, content){
    // makes the desired element... well in the first place we already have objects
    // so this function should simply create a visual representation of such an object
    // therfore: cssClass is solely in charge of applying the correct css rules to the element
    // via a combination fo user defined styling and object-style-rule pairs.
    // id carries over from the database, adjusted for the first id called
    // content is built with a combination of makeElement calls and the content stored in database
    // too granular for use? or useful for specific cases, such as simple elements
    return `<div class="${cssClass}" id="${id}">${content}</div>`
}
function makeGroup(group){
    // not every todo will belong to a group
    // append group info
    // mock first group instantiated:
    // will have to offset display id by group in the future
    id = 1
    $("#grid").append(
        makeElement("group", `group${id}`,
            makeElement("row title", `title${id}`, `<span><h3>Group ${id}</h3></span>`) + 
            makeElement("row", `parents${id}`, "") +
            makeElement("row", `children${id}`, "")
        )
    )
    // populate todos
    makeTodos();
}
function makeChild(){
    // if there is no child make an empty div
}
function makeTodos(todos){
    // append todo information into groups
    // first the parents
    groupId = 1
    todoId = [1,2,3]
    todoId.forEach(i => {
        $(`#parents${groupId}`).append(
            makeElement("todo col-sm", `todo${i}`,
                `
                ${i}. Todo Item
                <ul>
                    <li>Description and other fields</li>
                </ul>
                `
            )
        )
        // then the children
        $(`#children${groupId}`).append(
            makeElement("todo child col-sm", `todo${i}a`,
                `
                ${i}a. Todo Item
                <ul>
                    <li>Description and other fields</li>
                </ul>
                `
            )
        )
    });
}
// an example of the ajax call to make a new todo
// $.ajax({
//         method: "POST",
//         url: "/api/todos/",
//         dataType: "json",
//         data: {},
//         success: function(result,status){
//             alert(result)
//         }
// })
function makeEntityElement(entity, id, editFields){
    // only one of these should ever be on screen at a time
    // currently the problem is, I want this function to be able to accept a
    // new todo to build the todo maker interface, however we need the script from Todo.js, 
    // which cannot be found currently...
    result = "<div class='container-fluid todo'>"
    result += `<input type='hidden' id='id${id}' name='id${id}' value='${id}'>`;
    for(var property in entity){
        // private properties are not included in this for loop
        // if editFields, also return the corresponding form or input type to allow the user to submit an ajax call
        // to create/update the field. ex. textarea or datepicker
        if(editFields || entity[property] != 0 || entity[property] === false){
            result += `${property}: `
        }
        if(editFields){
            // if working on an existing element, put values
            // otherwise a default todo will be passed, making their values effectively the desired defaults
            // might need some span tags for better formatting
            switch(property){
                case "title":
                    result += `&nbsp<input type='text' id='title${id}' name='title${id}' value='${entity[property]}'>`
                    break;
                case "description":
                    result += `&nbsp<textarea id='description${id}' name='description${id}'>${entity[property]}</textarea>`
                    break;
                case "completed":
                    result += `&nbsp<input type='checkbox' id='completed${id}' name='completed${id}' value='isChecked' ${(Boolean(entity[property]) ? "checked=''" : "")}>`
                    break;
                case "weight":
                    result += `&nbsp<input type='number' id='weight${id}' name='weight${id}' min='0' max='10' value='${entity[property]}'>`
                    break;
                case "time_estimate":
                    result += `&nbspHours: <input type='number' id='time_estimate_hours${id}' name='time_estimate_hours${id}' min ='0' max='24' value=''>` + 
                        `&nbspMinutes: <input type='number' id='time_estimate_minutes${id}' name='time_estimate_minutes${id}' min ='0' max='60' value=''>`
                    break;
                case "due_date":
                    // datetime
                    var today = new Date()
                    result += `&nbsp<input type='date' id='due_date${id}' name='due_date${id}' min='${today.getFullYear()}-${
                        String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}' value="2022-07-01">`
                    break;
            }
            result += "<br>"
        } else {
            // just put the value of the property
            if(editFields || entity[property] != 0 || entity[property] === false){
                result += `${entity[property]}`
                result += "<br>"
            }
        }
    }
    if(editFields){
        result += `<button id='submit' onclick='submitTodo()'>Submit</button><br>`
    }
    result += "</div>"
    return result;
}
function submitTodo(){
    $.ajax({
        method: "POST",
        url: "/api/todos/",
        dataType: "json",
        data: {id : -1,
            dateCreated : "",
            dateUpdated : "",
            completed : false,
            title : "testpost",
            description : "",
            tags : [],
            weight : 0,
            prerequisites : [],
            time_estimate : "",
            due_date : ""},
        success: function(result,status){
            alert(`ID of created entity: ${result}`)
        }
    })
}