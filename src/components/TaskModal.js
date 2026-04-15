function TaskModal({ title, desc, setTitle, setDesc, addTask, close }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />

        <button onClick={addTask}>Save</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskModal;