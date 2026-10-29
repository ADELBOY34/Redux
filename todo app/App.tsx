import { useState } from "react";
import { useSelector } from "react-redux";
import AddTask from "./AddTask";
import ListTask, { type TaskFilter } from "./ListTask";
import type { RootState } from "./store";

const filters: { id: TaskFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "To do" },
  { id: "done", label: "Done" },
];

export default function App() {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const remaining = tasks.filter((task) => !task.isDone).length;

  return (
    <main className="page-shell">
      <section className="todo-card" aria-labelledby="page-title">
        <header className="card-header">
          <div className="eyebrow"><span className="status-dot" /> YOUR DAY, IN FOCUS</div>
          <h1 id="page-title">A little more <em>done.</em></h1>
          <p className="subtitle">Make room for what matters.</p>
          <div className="date-line"><span aria-hidden="true">✳</span> YOUR TASKS <span className="date-rule" /> <strong>{String(tasks.length).padStart(2, "0")}</strong></div>
        </header>

        <AddTask />

        <div className="list-toolbar">
          <nav className="filters" aria-label="Filter tasks">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`filter-button${filter === id ? " selected" : ""}`}
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
              >{label}</button>
            ))}
          </nav>
          <span className="remaining-count">{remaining} {remaining === 1 ? "left" : "left"}</span>
        </div>

        <ListTask filter={filter} />

        <footer className="card-footer">
          <span>SMALL STEPS COUNT</span>
          <span className="footer-mark" aria-hidden="true">✳</span>
          <span>ONE THING AT A TIME</span>
        </footer>
      </section>
      <p className="page-note">A calmer way to keep track.</p>
    </main>
  );
}
