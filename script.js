const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-task-btn");
const todoList = document.querySelector("#todo-list");
const clearCompletedButton = document.querySelector("#clear-completed-btn");
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

function createTask(task) {
  const newTask = document.createElement("li");

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.completed;

  const taskSpan = document.createElement("span");
  taskSpan.textContent = task.text;

  if (task.completed) {
    taskSpan.classList.add("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";

  taskCheckbox.addEventListener("change", function () {
    task.completed = taskCheckbox.checked;

    taskSpan.classList.toggle("completed", task.completed);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    updateCounter();
  });

  deleteButton.addEventListener("click", function () {
    newTask.remove();

    tasks = tasks.filter(function (savedTask) {
      return savedTask !== task;
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

  const task = {
  text: taskText,
  completed: false
};

tasks.push(task);

createTask(task);
  

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
  createTask(task);
});

updateCounter();

clearCompletedButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  todoList.innerHTML = "";

  tasks.forEach(function (task) {
  createTask(task);
});

  updateCounter();
});