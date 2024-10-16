
let tasks = [];

// Load tasks from localStorage
const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList(); // Update the task list in the UI with loaded tasks
        updateStats(); // Update stats based on loaded tasks
    }
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        updateTaskList(); // Update the task list in the UI
        taskInput.value = ""; // Clear the input field after adding
        updateStats(); // Update stats after adding task
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed; // Toggle completed status
    updateTaskList(); // Re-render the task list to reflect the updated status
    updateStats(); // Update stats after task completion toggled
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove task
    updateTaskList(); // Re-render task list
    updateStats(); // Update stats after task deletion
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1); // Remove the task for editing
    updateTaskList(); // Re-render task list
    updateStats(); // Update stats after editing
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");

    // Update progress bar width
    progressBar.style.width = `${progress}%`;

    // Update the task numbers display
    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks) {
        blastConfetti();
    }
};

// Function to update the task list
const updateTaskList = () => {
    const tasklist = document.querySelector(".task-list");
    tasklist.innerHTML = ""; // Clear previous tasks

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        // Use backticks for multiline strings in JavaScript
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p> <!-- This is now dynamic -->
                </div>
                <div class="icons">
                    <img src="./img/edit1.png" alt="edit" onClick="editTask(${index})" />
                    <img src="./img/bin1.png" alt="bin" onClick="deleteTask(${index})" />
                </div>
            </div>
        `;

        // Add event listener for checkbox change to toggle completion
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));

        tasklist.appendChild(listItem);
    });
};

// Event listener for adding a task
document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission
    addTask(); // Add the task
});

// Load tasks when the script runs
loadTasks();


const blastConfetti = ()=> {
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}
