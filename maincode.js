let currentViewDate = new Date();
let tasks = JSON.parse(localStorage.getItem("nexus_tasks")) || [];
const calendarGrid = document.getElementById("calendar-grid");
const weekDisplay = document.getElementById("week-display");
const taskModal = document.getElementById("task-modal");
const addTaskBtn = document.getElementById("add-task-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const saveTaskBtn = document.getElementById("save-task-btn");
const detailSearch = document.getElementById("detail-search");
const detailDisplay = document.getElementById("detail-display");

function init() {
    renderCalendar();
    addTaskBtn.onclick = () => taskModal.style.display = "flex";
    closeModalBtn.onclick = () => taskModal.style.display = "none";
    saveTaskBtn.onclick = saveTask;
    document.getElementById("prev-week").onclick = () => {
        currentViewDate.setDate(currentViewDate.getDate() - 7);
        renderCalendar();
    };
    document.getElementById("next-week").onclick = () => {
        currentViewDate.setDate(currentViewDate.getDate() + 7);
        renderCalendar();
    };
    detailSearch.oninput = () => {
        const query = detailSearch.value.toLowerCase().trim();
        if (!query) {
            detailDisplay.innerHTML = `<p class="placeholder-text">Search a task to see details.</p>`;
            return;
        }
        const task = tasks.find(t => t.text.toLowerCase().includes(query));
        if (task) {
            detailDisplay.innerHTML = `
                <strong>${task.text}</strong><br>
                📅 ${task.startDate} to ${task.endDate}<br>
                ⏰ Ends: ${task.endTime || 'Not set'}<br>
                📊 Status: ${task.status.toUpperCase()}
            `;
        } else {
            detailDisplay.innerHTML = `<p class="placeholder-text">No task found.</p>`;
        }
    };
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function handleTaskClick(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    const currentStatus = tasks[taskIndex].status;

    if (currentStatus === 'todo') tasks[taskIndex].status = 'progress';
    else if (currentStatus === 'progress') {
        if (confirm("Is the task completed?")) tasks[taskIndex].status = 'done';
    } else if (currentStatus === 'done') tasks[taskIndex].status = 'todo';
    saveAndRender();
}

function deleteTask(e, taskId) {
    e.stopPropagation();
    tasks = tasks.filter(t => t.id !== taskId);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("nexus_tasks", JSON.stringify(tasks));
    renderCalendar();
}

function renderCalendar() {
    calendarGrid.innerHTML = "";
    const monday = getMonday(currentViewDate);
    const options = {
        month: 'short',
        day: 'numeric'
    };
    weekDisplay.innerText = `${monday.toLocaleDateString(undefined, options)} - ${new Date(new Date(monday).setDate(monday.getDate() + 6)).toLocaleDateString(undefined, { ...options, year: 'numeric' })}`;
    for (let i = 0; i < 7; i++) {
        let day = new Date(monday);
        day.setDate(monday.getDate() + i);
        let dateKey = day.toISOString().split('T')[0];
        const dayCol = document.createElement("div");
        dayCol.className = "day-column";
        dayCol.innerHTML = `
            <div class="day-header">
                <h4>${day.toLocaleDateString(undefined, { weekday: 'short' })}</h4>
                <span>${day.getDate()}</span>
            </div>
            <div class="task-list" id="list-${dateKey}"></div>
        `;
        calendarGrid.appendChild(dayCol);
        tasks.forEach(t => {
            if (dateKey >= t.startDate && dateKey <= t.endDate) {
                const card = document.createElement("div");
                card.className = `task-card ${t.status || 'todo'}`;
                card.innerHTML = `
                    ${t.text}
                    <span class="task-time">${t.endTime ? 'Ends: ' + t.endTime : ''}</span>
                    <button class="delete-task" onclick="deleteTask(event, ${t.id})">✖</button>
                `;
                card.onclick = () => handleTaskClick(t.id);
                document.getElementById(`list-${dateKey}`).appendChild(card);
            }
        });
    }
}

function saveTask() {
    const text = document.getElementById("task-input").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const endTime = document.getElementById("end-time").value;
    if (!text || !startDate || !endDate) return alert("Please fill Name, Start and End dates.");
    tasks.push({
        id: Date.now(),
        text,
        startDate,
        endDate,
        endTime,
        status: 'todo'
    });
    taskModal.style.display = "none";
    document.getElementById("task-input").value = "";
    document.getElementById("start-date").value = "";
    document.getElementById("end-date").value = "";
    document.getElementById("end-time").value = "";
    saveAndRender();
}
init();