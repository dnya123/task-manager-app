import React from "react";
function TaskCard({ task, deleteTask, updateTask }) {

  return (
    <div
      className="task"
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "5px",
      }}
    >

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>

      <button
        onClick={() => deleteTask(task._id)}
      >
        Delete
      </button>

      {task.status !== "Completed" && (

        <button
          onClick={() => updateTask(task._id)}
          style={{
            marginLeft: "10px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Complete
        </button>

      )}

    </div>
  );
}

export default React.memo(TaskCard);