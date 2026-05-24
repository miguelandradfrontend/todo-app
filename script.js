const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-task-btn");
const todoList = document.querySelector("#todo-list");

function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
        return;
    }
    const newTask = document.createElement("li");

    newTask.addEventListener("click", function () {
        newTask.classList.toggle("completed");
});

    const deleteButton = document.createElement("button");

    newTask.textContent = taskText;

    deleteButton.textContent = "Eliminar";

    deleteButton.addEventListener("click", function () {
    newTask.remove();
});

    newTask.appendChild(deleteButton);

    todoList.appendChild(newTask);

    localStorage.setItem("lastTask", taskText);

    todoInput.value = "";
}

addTaskButton.addEventListener("click", function () {
  addTask();
});

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});