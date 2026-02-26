# 📅 Nexus -- Professional Weekly Planner

Nexus is a clean and modern **Weekly Task Planner** built using **HTML,
CSS, and Vanilla JavaScript**. It allows users to schedule, manage,
track, and search tasks efficiently with a smooth UI experience.

------------------------------------------------------------------------

## 🚀 Features

-   📆 Weekly calendar view (Monday--Sunday)
-   ➕ Add new tasks with:
    -   Task name
    -   Start date
    -   End date
    -   End time
-   🔄 Task status cycle:
    -   `Todo` → `In Progress` → `Done`
-   🎯 Visual status indicators with color coding
-   🗑 Delete tasks
-   🔍 Task Detail Viewer (Search tasks instantly)
-   💾 LocalStorage support (data persists after refresh)
-   ⬅ Navigate between weeks

------------------------------------------------------------------------

## 🖥️ Tech Stack

-   HTML5
-   CSS3 (Modern UI with CSS Variables)
-   JavaScript (ES6)
-   LocalStorage API

------------------------------------------------------------------------

## 📂 Project Structure

    📁 nexus-planner
    │
    ├── index.html      # Main HTML structure
    ├── design.css      # Styling & layout
    ├── maincode.js     # Core application logic
    └── README.md       # Project documentation

------------------------------------------------------------------------

## ⚙️ How It Works

### 🗓 Weekly Rendering

-   The app calculates the current week's Monday.
-   It dynamically generates 7 columns (Mon--Sun).
-   Tasks are displayed if their date falls between: startDate \<=
    currentDay \<= endDate

### 📊 Task Status Logic

Clicking a task cycles through: todo → progress → done → todo

Each state has its own color style: - 🔴 Todo - 🟡 In Progress - 🟢 Done

------------------------------------------------------------------------

## 💾 Data Persistence

All tasks are stored using: localStorage.setItem("nexus_tasks",
JSON.stringify(tasks));

This ensures: - Tasks remain saved after page refresh - No backend
required

------------------------------------------------------------------------

## 🔧 Future Improvements

-   ✏ Edit existing tasks
-   🕒 Start time support
-   📱 Mobile responsiveness improvements
-   🌙 Dark mode
-   🔔 Notifications
-   ☁ Backend integration

------------------------------------------------------------------------

## 🎯 Learning Outcome

This project demonstrates: - Strong understanding of JavaScript
fundamentals - State management without frameworks - Dynamic UI
generation - Practical use of browser APIs

------------------------------------------------------------------------

## 📜 License

This project is open-source and free to use for educational purposes.
