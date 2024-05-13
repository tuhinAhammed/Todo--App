const todoInput = document.querySelector(".todoInput")
const addTodo = document.querySelector(".addTodo")
const todoUl = document.querySelector(".ul")
const todoMessage = document.querySelector(".todoMessage")
addTodo.addEventListener("click", () => {
    addTodoItem()
})
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("clicked enter");
        addTodoItem()
    }
})

function addTodoItem() {

    if (todoInput.value === "") {
        messageStatus("Enter a Todo Name Then Try", "danger")
    } else {
        const existingTodoNames = Array.from(todoUl.querySelectorAll(".todoName")).map(demo => demo.innerHTML.trim());
        if (existingTodoNames.includes(todoInput.value.trim())) {
            messageStatus("Todo Name Already Exists", "danger");
        } else {
            // create li
            var li = document.createElement("li")
            li.classList.add("addedTodo")
            todoUl.appendChild(li)

            // create todo name
            var TodoName = document.createElement("div")
            TodoName.innerHTML = todoInput.value
            TodoName.classList.add("todoName")
            li.appendChild(TodoName)

            // create delete button
            var TodoDeleteButton = document.createElement("i")
            TodoDeleteButton.classList.add("deleteTodo", "fa-solid", "fa-trash-can")
            li.appendChild(TodoDeleteButton)

            todoInput.value = ""

            storeData()
            messageStatus("Todo Crated Successfully", "success")


        }
    }
}

//  todo status upadate message dynamic
const messageStatus = (text, status) => {
    todoMessage.innerHTML = `${text}`
    todoMessage.classList.add(`color-${status}`)
    setTimeout(() => {
        todoMessage.innerHTML = ""
        todoMessage.classList.remove(`color-${status}`)
        // todoMessage.classList.remove("todoMessage")
    }, 1500)

}

// delete todo
todoUl.addEventListener("click", (e) => {
    storeData()
    if (e.target.classList.contains("deleteTodo")) {
        e.target.parentElement.remove()
        messageStatus("Todo deleted successfully done", "danger")
        storeData()
    }
})

// set data to localStorage
function storeData() {
    localStorage.setItem("data", todoUl.innerHTML)
}
// delete todo 
function getData() {
    todoUl.innerHTML = localStorage.getItem("data")
}

// show all data from localStorage
getData()