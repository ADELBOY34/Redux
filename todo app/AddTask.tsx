import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { addTask } from "./store";

export default function AddTask() {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanedDescription = description.trim();
    if (!cleanedDescription) return;
    dispatch(addTask(cleanedDescription));
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">New task</label>
      <input
        id="new-task"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What needs to get done?"
        maxLength={160}
      />
      <button className="primary-button" type="submit" disabled={!description.trim()}>
        <span aria-hidden="true">＋</span> Add task
      </button>
    </form>
  );
}
