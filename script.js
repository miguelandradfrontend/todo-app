const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-task-btn");
const todoList = document.querySelector("#todo-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateCounter() {
  const pendingTasks = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;

  document.querySelector("#task-counter").textContent =
    `Pendientes: ${pendingTasks} | Completadas: ${completedTasks}`;
}

function createTask(taskText, completed = false) {
  const newTask = document.createElement("li");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = completed;

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  if (completed) {
    taskSpan.classList.add("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";

  taskCheckbox.addEventListener("change", function () {
    taskSpan.classList.toggle("completed");

    const taskToUpdate = tasks.find(function (task) {
      return task.text === taskText;
    });

    taskToUpdate.completed = taskCheckbox.checked;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    updateCounter();
  });

  deleteButton.addEventListener("click", function () {
    newTask.remove();

    tasks = tasks.filter(function (task) {
      return task.text !== taskText;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCounter();
  });

  newTask.appendChild(taskCheckbox);
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

  updateCounter();

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

updateCounter();