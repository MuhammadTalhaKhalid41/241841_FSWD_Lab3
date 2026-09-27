// ===== Selecting DOM Elements =====
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const errorMessage = document.getElementById("errorMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");


function createTaskElement(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

// Reads the input, validates it, creates a task, and resets the input
function addTask() {
  const value = taskInput.value.trim();

 
  if (value === "") {
    errorMessage.textContent = "Please type a task before adding it.";
    taskInput.focus();
    return;
  }

  errorMessage.textContent = "";

  const li = createTaskElement(value);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();

  updateTaskCount();
}

// Clicking Add creates a task
addBtn.addEventListener("click", () => {
  addTask();
});

// Pressing Enter in the input also creates a task
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Typing again after an error clears the error message
taskInput.addEventListener("input", () => {
  if (errorMessage.textContent !== "") {
    errorMessage.textContent = "";
  }
});


taskList.addEventListener("click", (event) => {
  const target = event.target;

  // Deleting a task
  if (target.classList.contains("delete-btn")) {
    const li = target.closest("li");
    li.remove();
    updateTaskCount();
    return;
  }

  
  const li = target.closest("li");
  if (li) {
    li.classList.toggle("completed");
  }
});


function updateTaskCount() {
  const total = taskList.children.length;

  if (total === 0) {
    taskCount.textContent = "No tasks yet.";
    return;
  }

  taskCount.textContent = `${total} task${total === 1 ? "" : "s"}`;
}

clearCompletedBtn.addEventListener("click", () => {
  const completedTasks = taskList.querySelectorAll("li.completed");

  completedTasks.forEach((li) => {
    li.remove();
  });

  updateTaskCount();
});

// Set the correct initial state (0 tasks / "No tasks yet.") on page load
updateTaskCount();
