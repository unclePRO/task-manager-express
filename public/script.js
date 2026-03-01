async function loadTasks() {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    console.log(tasks);
    displayTasks(tasks);
}

function displayTasks(tasks) {
    const listDiv = document.getElementById('taskList');
    listDiv.innerHTML = '';
  
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.innerHTML = `<h3>Title: ${task.title}</h3> <p>Description: ${task.description}</p><p>Completed: ${task.completed}</p>`;
        listDiv.appendChild(taskDiv);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});
