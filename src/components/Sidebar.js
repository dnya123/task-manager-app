function Sidebar({ logout }) {

  return (
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
  );
}

export default Sidebar;