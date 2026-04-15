import TaskModal from "./TaskModal";

function Dashboard({ currentUser, tasks, deleteTask, showModal, setShowModal, addTask, title, setTitle, desc, setDesc, logout }) {
  return (
    <div className="dashboard" style={{ display: "flex" }}>
  <div className="sidebar" style={{ width: "220px", background: "#2c2c2c", color: "white", padding: "20px" }}>
        <h2>Menu</h2>
        <p>Dashboard</p>
        <p>Tasks</p>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="main" style={{ flex: 1, padding: "30px" }}>
        <h1>Welcome {currentUser?.name} </h1>

        <button className="add-btn" onClick={() => setShowModal(true)}>
            Add Task
        </button>

        {tasks.map((task, index) => (
          <div key={index} className="task">
            <h3>{task.title}</h3>
            <p>{task.desc}</p>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
            </button>
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
        />
      )}
    </div>
  );
}

export default Dashboard;