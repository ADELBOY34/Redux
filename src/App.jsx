import { useMemo, useState } from "react";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

const initialTasks = [
  { id: 1, description: "Learn React components", isDone: true },
  { id: 2, description: "Build the todo list UI", isDone: false },
  { id: 3, description: "Test the edit feature", isDone: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description,
      isDone: false,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const editTask = (taskId, description) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, description } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    if (filter === "done") {
      return tasks.filter((task) => task.isDone);
    }

    if (filter === "not-done") {
      return tasks.filter((task) => !task.isDone);
    }

    return tasks;
  }, [filter, tasks]);

  return (
    <main className="app-shell">
      <section className="todo-card">
        <div className="title-block">
          <p className="eyebrow">Task Manager</p>
          <h1>Todo List</h1>
          <p className="subtitle">
            Add tasks, mark them as done, filter the list, and edit any item.
          </p>
        </div>

        <AddTask onAddTask={addTask} />

        <div className="filter-bar">
          <span>Filter:</span>
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={filter === "done" ? "active" : ""}
            onClick={() => setFilter("done")}
          >
            Done
          </button>
          <button
            type="button"
            className={filter === "not-done" ? "active" : ""}
            onClick={() => setFilter("not-done")}
          >
            Not Done
          </button>
        </div>

        <ListTask
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onEditTask={editTask}
        />
      </section>
    </main>
  );
}

export default App;
