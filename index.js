
// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const themes = document.querySelector('.theme-icon');
const body = document.body;

// Event Listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", editTodo);
filterOption.addEventListener("click", filterTodo);
themes.addEventListener("click", changeTheme);

// Function

function addTodo(event) {
    // Prevent form from submitting
  event.preventDefault();
    // todo Div
  const todoDiv =document.createElement("div");
  todoDiv.classList.add("todo");
    // Create LI
  const newTodo = document.createElement("input");
  newTodo.value = todoInput.value;
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("readonly", true);
  todoDiv.appendChild(newTodo);
    ///Add Todo To Localstorage
    //saveLocalTodos(todoInput.value);
    // Edit Button
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
  editButton.classList.add ("edit-btn");
  todoDiv.appendChild(editButton)
    // Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add ("complete-btn");
  todoDiv.appendChild(completedButton)
    // Check Trach Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
      // Append to List
  todoList.appendChild(todoDiv)
    // Clear Todo Input Value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
    // Delete Todo
  if(item.classList[0] ==="trash-btn") {
    const todo = item.parentElement;
      //Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function() {
      todo.remove();
    });
  }

  // Check Mark
  if(item.classList[0] ==="complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//Edit Task
function editTodo(e) {
  let click_count = 0;
  const task = e.target;
  const todo = task.parentElement.childNodes[0];
  if(task.classList[0] ==="edit-btn"){
    todo.removeAttribute("readonly");
    todo.focus();
    document.body.addEventListener("click", function unselect() {
      if(click_count > 0){
      console.log("worked");
      todo.setAttribute("readonly", true);
      //Save to storage
      document.body.removeEventListener("click", unselect)
      }
      else{
        click_count++;
      }
    });
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if(todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")){
          todo.style.display = "flex";
        } else {
          todo.style.display ="none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
    //Check---hey do I alredy have things in there?
  let todos;
  if(localStorage.getItem("todos") === null) {
    todo = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function changeTheme() {
  if(body.className === "light-mode"){
    body.className = "";
  }
  else{
    body.className = "light-mode";    
  }
}