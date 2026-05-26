const todoInput = document.querySelector("#todo-input");
const addTaskButton = document.querySelector("#add-task-btn");
const todoList = document.querySelector("#todo-list");
const clearCompletedButton = document.querySelector("#clear-completed-btn");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach(function (task) {
    createTask(task);
  });
}


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

    saveTasks();
    updateCounter();
  });

  deleteButton.addEventListener("click", function () {
    newTask.remove();

    tasks = tasks.filter(function (savedTask) {
      return savedTask !== task;
    });

    saveTasks();
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
saveTasks();
updateCounter();
todoInput.value = "";
}

addTaskButton.addEventListener("click", addTask);

todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
updateCounter();

clearCompletedButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  renderTasks();
  updateCounter();
});