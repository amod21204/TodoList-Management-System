const API_URL = "http://localhost:8080/tasks";

async function loadTasks() {

    const response = await fetch(API_URL);

    const tasks = await response.json();

    document.getElementById("totalTasks").innerText =
        tasks.length;

    document.getElementById("completedTasks").innerText =
        tasks.filter(task => task.completed).length;

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        taskList.innerHTML += `

        <div class="task-card">

            <h3 class="${task.completed ? 'completed' : ''}">
                ${task.title}
            </h3>

            <p>${task.description}</p>

            <p>
                Priority:
                <b>${task.priority}</b>
            </p>

            <p>
                Deadline:
                ${task.deadline}
            </p>

            <button
                onclick="completeTask(${task.id})">

                Complete

            </button>

            <button
                onclick="deleteTask(${task.id})">

                Delete

            </button>

        </div>
        `;
    });
}

async function addTask() {

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    const deadline =
        document.getElementById("deadline").value;

    const priority =
        document.getElementById("priority").value;

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            title,
            description,
            deadline,
            priority,
            completed: false

        })

    });

    loadTasks();
}

async function deleteTask(id) {

    await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );

    loadTasks();
}

async function completeTask(id) {

    await fetch(
        `${API_URL}/${id}/complete`,
        {
            method: "PUT"
        }
    );

    loadTasks();
}

function searchTask() {

    let input =
        document.getElementById("search")
            .value
            .toLowerCase();

    let cards =
        document.querySelectorAll(".task-card");

    cards.forEach(card => {

        if (card.innerText
            .toLowerCase()
            .includes(input)) {

            card.style.display = "block";
        }
        else {

            card.style.display = "none";
        }

    });
}

loadTasks();