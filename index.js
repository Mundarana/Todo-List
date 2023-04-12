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
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
   ///Add Todo To Localstorage
    //saveLocalTodos(todoInput.value);
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

//   function saveLocalTodos(todo) {
//      //Check---hey do I alredy have things in there?
//   let todos;
//   if(localStorage.getItem("todos") === null) {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   todos.push(todo);
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

