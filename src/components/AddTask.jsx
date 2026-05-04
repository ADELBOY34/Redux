import { useState } from "react";

function AddTask({ onAddTask }) {
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      return;
    }

    onAddTask(trimmedDescription);
    setDescription("");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
