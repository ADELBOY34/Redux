import Task from "./Task";

function ListTask({ tasks, onToggleTask, onEditTask }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks match this filter.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}

export default ListTask;
