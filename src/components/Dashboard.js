import TaskModal from "./TaskModal";

function Dashboard({ currentUser, tasks, deleteTask,  updateTask, showModal, setShowModal, addTask, title, setTitle, desc, setDesc, logout, loading }) {
  return (
    <div className="dashboard" style={{ display: "flex" }}>
  <div
  className="sidebar"
  style={{
    width: "220px",
    background: "#2c2c2c",
    color: "white",
    padding: "20px",
    position: "fixed",
    height: "100vh",
    top: 0,
    left: 0,
  }}
>
        <h2>Menu</h2>
        <p>Dashboard</p>
        <p>Tasks</p>
        <button
  onClick={logout}
  style={{
    marginTop: "20px",
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
>
  Logout
</button>
      </div>

      <div className="main" style={{ flex: 1, marginLeft: "240px", padding: "30px" }}>
        <h1>Welcome {currentUser?.name} </h1>

        <button className="add-btn" onClick={() => setShowModal(true)}>
            Add Task
        </button>
        {tasks.length === 0 && <p>No Tasks Found</p>}
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button className="delete-btn"onClick={() => deleteTask(task._id)}>
                Delete
            </button>
            {task.status !== "Completed" && (
             <button
  onClick={() => updateTask(task._id)}
  style={{
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  Complete
</button>
             
)}
          </div>
        ))}
      </div>

      {showModal && (
        <TaskModal
          title={title}
          desc={desc}
          setTitle={setTitle}
          setDesc={setDesc}
          addTask={addTask}
          close={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Dashboard;