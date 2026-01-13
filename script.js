document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));

    addBtn.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            return;
        }
        const newTask = {
            id: Date.now(), // date.now is used to generate unique ids based on timestamp
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        savetasks();
        renderTask(newTask);
        todoInput.value = ""; // Clear input field
        console.log(tasks);
    });

    function renderTask(task) {
        const li=document.createElement("li");
        li.classList.add("task");
        li.setAttribute("data-id",task.id);
        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
         <span> ${task.text} </span>
         <button class="delete-btn">Delete</button>
        `;

        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return; // Ignore clicks on delete button
            task.completed = !task.completed;
            li.classList.toggle("completed");
            savetasks();
        });

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering the li click event
            tasks = tasks.filter( t => t.id !== task.id);
            li.remove();
            savetasks();
        });
        
        todoList.appendChild(li);
    }

    function savetasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to local storage
    }
});