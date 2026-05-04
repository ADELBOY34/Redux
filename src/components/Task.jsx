import { useState } from "react";

function Task({ task, onToggleTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    const trimmedDescription = editedDescription.trim();

    if (!trimmedDescription) {
      return;
    }

    onEditTask(task.id, trimmedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  return (
    <article className="task-item">
      <div className="task-main">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => onToggleTask(task.id)}
        />

        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editedDescription}
            onChange={(event) => setEditedDescription(event.target.value)}
          />
        ) : (
          <div className="task-copy">
            <p className={task.isDone ? "task-text done" : "task-text"}>
              {task.description}
            </p>
            <small>Id: {task.id}</small>
          </div>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" className="ghost-button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </article>
  );
}

export default Task;
