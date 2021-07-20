const COLUMN_COUNT = 4
const LOAD_BY = 40

//probably should use destructuring to make optional values
function makeGrid(count, elementName = "grid", todos = {}){
    // takes in a list of todos and prepares a grid for them
    // works without +1 on the iterator limit because of loosely typed
    // declare iterator Generator to dynamically iterate through fields in the todos object
    let iteratorGenerator = iterateObject(todos)
    for(let i = 0; i<(count/COLUMN_COUNT); i++){
        // make rows
        $(`#${elementName}`).append(
            `
            <div class="row" id=${i}>
            </div>
            `
        )
        for(let j=0; j<4; j++){
            //insert columns into rows with id="i_j"
            $(`#${i}`).append(
                `
                <div style="visibility:collapse" class="cell col-sm" id="${i}_${j}">
                </div>
                `
            )
            id = iteratorGenerator.next().value
            // overflow protection
            if(id != -1){ insertIntoGrid(j,i, makeEntityElement(todos[id], id, false)) }
        }
    }
    
}

function insertIntoGrid(x,y,content){
    $(`#${y}_${x}`).html(content);
    content != 0 ? $(`#${y}_${x}`).css("visibility","visible") : $(`#${y}_${x}`).css("visibility","collapse")
}

function* iterateObject(o){
    for (var e in o){
        yield e
    }
    return -1
}

function appendIntoGrid(x,y,content){
    $(`#${y}_${x}`).append(content);
}

function makeGroup(group){
    // not every todo will belong to a group
    // append group info
    // mock first group instantiated:
    // will have to offset display id by group in the future
    id = 1
    $("#grid").append(
        `
        <div class="group" id="group${id}">
            <div class="row title" id="title${id}">
                <span><h3>Group ${id}</h3></span>
            </div>
            <div class="row" id="parents${id}">
            </div>
            <div class="row" id="children${id}">
            </div>
        </div>
        `
    )
    // populate todos
    makeTodos();
}
function makeChild(){
    // if there is no child make an empty div
}
function makeTodos(todos, groupId){
    // append todo information into groups
    // first the parents
    groupId = 1
    todoId = [1,2,3]
    todoId.forEach(i => {
        $(`#parents${groupId}`).append(
            `
            <div class="todo col-sm" id="todo${i}">
                ${i}. Todo Item
                <ul>
                    <li>Description and other fields</li>
                </ul>
            </div>
            `
        )
        // then the children
        $(`#children${groupId}`).append(
            `
            <div class="todo child col-sm" id="todo${i}a">
                ${i}a. Todo Item
                <ul>
                    <li>Description and other fields</li>
                </ul>
            </div>
            `
        )
    });
}

function makeEntityElement(entity, id, editFields){
    // only one of these should ever be on screen at a time
    // currently the problem is, I want this function to be able to accept a
    // new todo to build the todo maker interface, however we need the script from Todo.js, 
    // which cannot be found currently...
    result = "<div class='d-flex justify-content-center container-fluid todo'><div class='centered'><div class='left'>"
    result += `<input type='hidden' id='id${id}' name='id${id}' value='${id}'>`;
    result += `<ul>`;
    for(var property in entity){
        // private properties are not included in this for loop
        // if editFields, also return the corresponding form or input type to allow the user to submit an ajax call
        // to create/update the field. ex. textarea or datepicker
        if(editFields || entity[property] != 0 || property == "completed"){
            result += `<li>${capitalizeFirst(property)}: `
        }
        if(editFields || property == "completed"){
            // if working on an existing element, put values
            // otherwise a default todo will be passed, making their values effectively the desired defaults
            // might need some span tags for better formatting
            switch(property){
                case "title":
                    result += `&nbsp<input type='text' id='title${id}' name='title${id}' value='${entity[property]}'></li>`
                    break;
                case "description":
                    result += `&nbsp<textarea id='description${id}' name='description${id}'>${entity[property]}</textarea></li>`
                    break;
                case "completed":
                    result += `&nbsp<input type='checkbox' id='completed${id}' name='completed${id}' value='isChecked' ${(Boolean(entity[property]) ? "checked=''" : "")}></li>`
                    break;
                case "weight":
                    result += `&nbsp<input type='number' id='weight${id}' name='weight${id}' min='0' max='10' value='${entity[property]}'></li>`
                    break;
                case "time_estimate":
                    result += `&nbspHours: <input type='number' id='time_estimate_hours${id}' name='time_estimate_hours${id}' min ='0' max='24' value='${entity[property] != 0 ? entity[property]/60 : ""}'>` + 
                        `&nbspMinutes: <input type='number' id='time_estimate_minutes${id}' name='time_estimate_minutes${id}' min ='0' max='60' value='${entity[property] != 0 ? entity[property]%60 : ""}'></li>`
                    break;
                case "due_date":
                    // datetime
                    var today = new Date()
                    // value of form 2022-07-01
                    result += `&nbsp<input type='date' id='due_date${id}' name='due_date${id}' min='${today.getFullYear()}-${
                        String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}' value=""></li>`
                    break;
            }
        } else {
            // just put the value of the property
            if(editFields || entity[property] != 0 || property == "completed"){
                result += `${entity[property]}</li>`
            }
        }
    }
    result += `</ul></div>`
    if(editFields){
        result += `<button id='submit_${id}' onclick='submitTodo(${id})'>Submit</button><br>`
    }
    result += "</div></div>"
    return result;
}

async function promptNewTodo(){
    var entity = ""
    await $.ajax({
        method: "GET",
        url: "/api/todos/getClass",
        dataType: "json",
        success: function(result,status){
            entity = makeEntityElement(result, -1, true)
        }
    })
    return entity;
}

function submitTodo(submitId){
    todoData = {
        id : submitId,
        dateCreated : "",
        dateUpdated : "",
        completed : 1,
        title : "test title3",
        description : "test description",
        tags : [],
        weight : 5,
        prerequisites : [],
        time_estimate : "",
        due_date : ""
    }
    console.log(todoData)
    // $.ajax({
    //     method: "POST",
    //     url: "/api/todos/add",
    //     dataType: "json",
    //     data: {id : -1,
    //         dateCreated : "",
    //         dateUpdated : "",
    //         completed : 1,
    //         title : "test title3",
    //         description : "test description",
    //         tags : [],
    //         weight : 5,
    //         prerequisites : [],
    //         time_estimate : "",
    //         due_date : ""},
    //     success: function(result,status){
    //         alert(`ID of created entity: ${result}`)
    //     }
    // })
}

function capitalizeFirst(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
}