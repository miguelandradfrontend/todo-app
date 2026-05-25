const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-task-btn");
const todoList = document.querySelector("#todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createTask(taskText, completed = false) {
  const newTask = document.createElement("li");

  newTask.addEventListener("click", function () {
  taskSpan.classList.toggle("completed");

  const taskToUpdate = tasks.find(function (task) {
    return task.text === taskText;
  });

  taskToUpdate.completed = taskSpan.classList.contains("completed");

  localStorage.setItem("tasks", JSON.stringify(tasks));
});

  const deleteButton = document.createElement("button");

  const taskSpan = document.createElement("span");

  taskSpan.textContent = taskText;

  deleteButton.textContent = "Eliminar";

  deleteButton.addEventListener("click", function (event) {
  event.stopPropagation();

  newTask.remove();

  tasks = tasks.filter(function (task) {
    return task.text !== taskText;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
});

  if (completed) {
    taskSpan.classList.add("completed");
  }

  newTask.appendChild(taskSpan);
  newTask.appendChild(deleteButton);

  todoList.appendChild(newTask);
}
function addTask() {
  const taskText = todoInput.value.trim();

  if (taskText === "") {
    return;
  }

  createTask(taskText);
  tasks.push({
  text: taskText,
  completed: false
});

  localStorage.setItem("tasks", JSON.stringify(tasks));

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

tasks.forEach(function (task) {
  createTask(task.text, task.completed);
});