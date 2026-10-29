import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch, Task as TaskData } from "./store";
import { editTask, toggleTask } from "./store";

interface TaskProps {
  task: TaskData;
}

export default function Task({ task }: TaskProps) {
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch<AppDispatch>();

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedDescription = description.trim();
    if (!cleanedDescription) return;
    dispatch(editTask({ id: task.id, description: cleanedDescription }));
    setEditing(false);
  }

  function cancelEdit() {
    setDescription(task.description);
    setEditing(false);
  }

  return (
    <li className={`task-row${task.isDone ? " is-done" : ""}`}>
      <input
        className="task-checkbox"
        type="checkbox"
        checked={task.isDone}
        onChange={() => dispatch(toggleTask(task.id))}
        aria-label={`${task.isDone ? "Mark incomplete" : "Mark complete"}: ${task.description}`}
      />
      {editing ? (
        <form className="edit-form" onSubmit={save}>
          <label className="sr-only" htmlFor={`edit-${task.id}`}>Edit task</label>
          <input
            id={`edit-${task.id}`}
            autoFocus
            maxLength={160}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <button className="text-button save-button" type="submit" disabled={!description.trim()}>Save</button>
          <button className="text-button" type="button" onClick={cancelEdit}>Cancel</button>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          <button
            className="edit-button"
            type="button"
            onClick={() => { setDescription(task.description); setEditing(true); }}
            aria-label={`Edit ${task.description}`}
            title="Edit task"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16.5V20h3.5L18 9.5 14.5 6 4 16.5ZM20.7 6.8a.9.9 0 0 0 0-1.3l-2.2-2.2a.9.9 0 0 0-1.3 0l-1.7 1.7 3.5 3.5 1.7-1.7Z" /></svg>
          </button>
        </>
      )}
    </li>
  );
}
