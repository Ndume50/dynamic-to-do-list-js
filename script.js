document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Define the addTask function
  function addTask() {
    // Retrieve and trim the task input value
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create task and remove button
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';

    // Remove task on button click
    removeButton.onclick = () => {
      taskList.removeChild(taskItem);
    };
taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    // Clear task input
    taskInput.value = '';
  }

  // Attach event listeners
  addButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
