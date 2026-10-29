import { useSelector } from "react-redux";
import type { RootState } from "./store";
import Task from "./Task";

export type TaskFilter = "all" | "active" | "done";

interface ListTaskProps {
  filter: TaskFilter;
}

export default function ListTask({ filter }: ListTaskProps) {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.isDone;
    if (filter === "done") return task.isDone;
    return true;
  });

  if (!visibleTasks.length) {
    return <div className="empty-state">
      <span aria-hidden="true">✳</span>
      <p>{filter === "done" ? "No completed tasks yet" : filter === "active" ? "You’re all caught up" : "Your list is clear"}</p>
      <small>{filter === "active" ? "Add a task above to get started." : "Try another filter or add a new task."}</small>
    </div>;
  }

  return <ul className="task-list">{visibleTasks.map((task) => <Task key={task.id} task={task} />)}</ul>;
}
