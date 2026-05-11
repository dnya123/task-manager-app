function Navbar({ currentUser, setShowModal }) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >

      <h1>
        Welcome {currentUser?.name}
      </h1>

      <p>Role: {currentUser?.role}</p>

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px",
        }}
      >
        Add Task
      </button>

    </div>
  );
}

export default Navbar;