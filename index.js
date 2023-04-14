// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const themes = document.querySelector('.theme-icon');
const body = document.body;

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
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

  const keys = Object.keys(localStorage)
  console.log(localStorage)
  console.log(keys)
  const key = (Math.max(...keys) + 1);
  if(localStorage.length === 0){
    newTodo.key = 0;
    localStorage.setItem(0, todoInput.value);
  }
  else{
    newTodo.key = key;
    localStorage.setItem(key, todoInput.value);
  }

  todoDiv.appendChild(newTodo);
    //Add Todo To Localstorage
  

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
    localStorage.removeItem(todo.firstChild.key)
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
      localStorage.setItem(todo.key, todo.value);
      todo.setAttribute("readonly", true);
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
  todos.forEach(function (todo) { 
      const mStyle = todo.style;
      if(mStyle != undefined && mStyle != null){
          switch (e.target.value) {
              case "all":
                  mStyle.display = "flex";
                  break;
              case "completed":
                  if (todo.classList.contains('completed')) {
                      mStyle.display = 'flex';
                  } else {
                      mStyle.display = "none";
                  }
                  break;
              case "uncompleted":
                  if (todo.classList.contains('completed')){
                      mStyle.display = 'none';
                  }
                  else{
                      mStyle.display = "flex";
                  }
                  break;
          }
      }
  })
}

//Get Todo array from localStorage
function getTodos(){
  let todos;
  // Create LI
  const length = localStorage.length;
  for (let i = 0; i < length; i++){
  
  const todo = document.createElement("div");
  todo.classList.add("todo");
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  const newTodo = document.createElement("input");
  const keys = Object.keys(localStorage)
  newTodo.key = keys[i]

  newTodo.value = localStorage.getItem(newTodo.key);
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("readonly", true);
  todoDiv.appendChild(newTodo);

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
  };
}

// Toggle DarkMode/LightMode
function changeTheme() {
  if(body.className === "light-mode"){
    body.className = "";
  }
  else{
    body.className = "light-mode";    
  }
}
