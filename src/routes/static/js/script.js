/*************************************
* REMINDER, THIS IS CLIENT SIDE CODE *
*************************************/
const COLUMN_COUNT = 5
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
        for(let j=0; j<COLUMN_COUNT; j++){
            //insert columns into rows with id="i_j"
            $(`#${i}`).append(
                `
                <div style="visibility:collapse" class="cell col-sm" id="${i}_${j}">
                </div>
                `
            )
            id = iteratorGenerator.next().value
            // overflow protection
            if(id && id !== -1){ insertIntoGrid(j,i, makeEntityElement(todos[id], id, false)) }
        }
    }
    
}

function insertIntoGrid(x,y,content){
    $(`#${y}_${x}`).html(content);
    content ? $(`#${y}_${x}`).css("visibility","visible") : $(`#${y}_${x}`).css("visibility","collapse")
}

function* iterateObject(o){
    for (var e in o){
        if(e != "count"){
            yield e
        }
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

function makeEntityElement(entity, id, editFields, objType){
    // currently the problem is, I want this function to be able to accept a
    // new todo to build the todo maker interface, however we need the script from Todo.js, 
    // which cannot be found currently...
    // this function has become something of a monolith
    if (typeof entity != "object") {
        return ""
    }
    result = `<div class='d-flex p-0 justify-content-center container-fluid todo' id='${id}'>`
    if(editFields){ 
        // prep form
        result += `<form id='form${id}' class='prompt'`
        switch(objType){
            case "todo":
                result += `action='/api/todos/add'`
                break;
            default:
                return ""
        }
        result += `>`
    }
    // align internals
    result += "<div class='centered container-fluid p-0'><div class='left'>"
    result += `<input type='hidden' name='id' value='${id}'>`;
    result += `<ul>`;
    for(var property in entity){
        // private properties are not included in this for loop
        // if editFields, also return the corresponding form or input type to allow the user to submit an ajax call
        // to create/update the field. ex. textarea or datepicker
        // if edit mode or truthy value or always display completed property
        if(editFields || entity[property] || property == "completed"){
            result += `<li>${removeUnderscore(capitalizeFirst(property))}: `
        }
        if(editFields || property == "completed"){
            // if working on an existing element, put values
            // otherwise a default todo will be passed, making their values effectively the desired defaults
            // might need some span tags for better formatting
            switch(property){
                case "title":
                    result += `<input type='text' id='title${id}' name='title' value='${entity[property]}'></li>`
                    break;
                case "description":
                    result += `<textarea id='description${id}' name='description'>${entity[property]}</textarea></li>`
                    break;
                case "completed":
                    result += `<input type='checkbox' id='completed${id}' name='completed' value='${id}' class='check' ${(Boolean(entity[property]) ? "checked=''" : "")}></li>`
                    break;
                case "weight":
                    result += `<input type='number' id='weight${id}' name='weight' min='0' max='10' value='${entity[property]}'></li>`
                    break;
                case "time_estimate":
                    [hours, minutes] = entity[property] ? convertTimeEstimate(entity[property]) : ["", ""]
                    result += `Hours:&nbsp<input type='number' id='time_estimate_hours${id}' name='time_estimate_hours' min ='0' max='24' value='${hours}'>` + 
                        ` Minutes:&nbsp<input type='number' id='time_estimate_minutes${id}' name='time_estimate_minutes' min ='0' max='60' value='${minutes}' step='5'></li>`
                    break;
                case "due_date":
                    // datetime
                    var today = new Date()
                    if(entity[property]){ var due = convertDueDate(entity[property]) }
                    // value of form 2022-07-01
                    result += `<input type='date' id='due_date${id}' name='due_date' min='${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}' value="`
                    result += due ? `${due.getFullYear()}-${String(Number(due.getMonth())+1).padStart(2,"0")}-${String(Number(due.getDate())).padStart(2,"0")}` : ""
                    result += `"> `
                    // of form 00:00
                    result += `<input type='time' id='due_time${id}' name='due_time' value="`
                    result += due ? `${due.getHours()}:${due.getMinutes()}` : ""
                    result += `"></li>`
                    break;
                default:
            }
        } else {
            // just put the value of the property
            // special formatting: Time Estimate
            if(entity[property] && property == "time_estimate"){
                [hours, minutes] = convertTimeEstimate(entity[property])
                if (hours != 0) {result += `Hours: ${hours} `}
                if (minutes != 0) {result += `Minutes: ${minutes}`}
            } else if (entity[property] && property == "due_date"){
                // special formatting DueDate
                var due = convertDueDate(entity[property])
                result += due.toDateString().split(" ").join("&nbsp") + " " + due.toLocaleTimeString("en-US").split(" ").join("&nbsp")
            } else if (editFields || entity[property] || property == "completed"){
                result += `${entity[property]}`
            }
            result += "</li>"
        }
    }
    result += `</ul></div>`
    if(editFields){
        result += `<input type='submit' id='submit${id}' value='Submit'></div></form>`
        result += `<button value='${id}' class='cancel'>Cancel</button>`
    } else {
        result += `</div><button value='${id}' class='edit'>Edit</button>`
    }
    return result;
}

async function promptNewTodo(){
    var entity = ""
    await $.ajax({
        method: "GET",
        url: "/api/todos/getClass",
        dataType: "json",
        success: function(result,status){
            entity = makeEntityElement(result, -1, true, "todo")
        }
    })
    return entity;
}

function submitForm(e){
    // function that overrides the default function of a form submit to use ajax calls instead
    // may have to be made into an async in order to real time update the grid with newly made/updated todos
    e.preventDefault()
    var form = $(this)
    console.log(form)
    return
    info = {}
    form.serializeArray().forEach(f => {
        info[f.name] = f.value
    })
    // verify title
    if(!info["title"]){
        // TODO: turn this into a toast
        alert("title cannot be blank!");
        return
    }
    // format special fields for submission
    if(info["completed"]){
        info["completed"] = 1
    }
    if(!info["time_estimate_hours"]){
        info["time_estimate_hours"] = "0"
    }
    if(!info["time_estimate_minutes"]){
        info["time_estimate_minutes"] = "0"
    }
    if(info["time_estimate_hours"] != "0" || info["time_estimate_minutes"] != "0"){
        info["time_estimate"] = `1900-00-01 ${String(info["time_estimate_hours"]).padStart(2,"0")}:${
            String(info["time_estimate_minutes"]).padStart(2,"0")}:00`
    }
    if(info["due_date"]){
        if(!info["due_time"]){
            info["due_time"] = "00:00"
        }
        info["due_date"] = `${info["due_date"]} ${info["due_time"]}:00`
    }
    // clean intermediatefields unnecessary to todo creation
    delete info["due_time"]
    delete info["time_estimate_hours"]
    delete info["time_estimate_minutes"]
    //
    console.log("sent:")
    console.log(info)
    $.ajax({
        method: "POST",
        url: form.attr("action"),
        dataType: "json",
        data: info,
        success: function(result,status){
            // turn this into a toast
            alert(`ID of created entity: ${result}`)
        }
    })
}

function capitalizeFirst(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function convertTimeEstimate(s){
    // a quick shortcut that uses slightly more memory but is easy to code
    s = s.split(" ")
    s = s[1].split(":")
    return [Number(s[0]), Number(s[1])]
}

function convertDueDate(s){
    // takes a database string and converts it into a Date object
    s = s.split(" ");
    // date part
    [year, month, day] = s[0].split("-");
    // time part
    [hours, minutes] = s[1].split(":");
    // month index off by one only when instantiating object
    month = Number(month) - 1
    return new Date(year, month, day, hours, minutes)
}

function removeUnderscore(s){
    return s.split("_").join(" ")
}

function cancel(){
    button = $(this) 
    console.log(button.attr("value"))
}
function edit(){
    button = $(this) 
    console.log(button.attr("value"))
}
function check(){
    box = $(this)
    console.log(box.attr("value"))
    console.log(box.attr("checked"))
}