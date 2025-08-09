document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage
  loadTasks();

  // Define the addTask function
  function addTask(taskText, save = true) {
    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create task and remove button
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.classList.add('task-item');

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Remove task on button click
    removeButton.onclick = () => {
      taskList.removeChild(taskItem);
      updateTasksInStorage();
    };
 taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    // Save to Local Storage if indicated
    if (save) {
      updateTasksInStorage(taskText, 'add');
    }
  }

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  // Update tasks in Local Storage
  function updateTasksInStorage(taskText = null, action = null) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (action === 'add') {
      storedTasks.push(taskText);
    } else {
      // Get current tasks in DOM and update Local Storage
      storedTasks = Array.from(taskList.children).map(li => li.firstChild.textContent.trim());
    }
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }
 // Attach event listeners
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
    taskInput.value = '';
  });
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
      taskInput.value = '';
    }
  });
});

