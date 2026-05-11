import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import AdminDashboard from "./AdminDashboard";
import React from "react";

function Dashboard({
  currentUser,
  tasks,
  deleteTask,
  updateTask,
  showModal,
  setShowModal,
  addTask,
  title,
  setTitle,
  desc,
  setDesc,
  logout,
  loading,
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
  sort,
  setSort,
  currentPage,
  setCurrentPage,
  totalPages,
  error,
}) {

  return (
    <div style={{ display: "flex" }}>

      <Sidebar logout={logout} />

      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "30px",
        }}
      >

        {/* ✅ Loading State */}
        {loading && (
          <h2>Loading...</h2>
        )}

        {/* ✅ Error State */}
        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <Navbar
          currentUser={currentUser}
          setShowModal={setShowModal}
        />

          {currentUser?.role === "admin" && (
          <AdminDashboard />
        )}

        {/* ✅ Filters */}

        <div style={{ marginBottom: "20px" }}>

          <input
            type="text"
            placeholder="Search Task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              marginRight: "10px",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            style={{
              padding: "8px",
              marginRight: "10px",
            }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              padding: "8px",
            }}
          >
            <option value="">Sort</option>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>

        </div>

        {/* ✅ Empty State */}

        {!loading && tasks.length === 0 && (

          <div
            style={{
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >

            <h3>No Tasks Found</h3>

            <p>Create your first task</p>

          </div>

        )}

        {/* ✅ Tasks */}

        {tasks?.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />

        ))}

        {/* ✅ Pagination */}

        <div style={{ marginTop: "20px" }}>

          <button
             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
             disabled={currentPage === 1}
            style={{
              padding: "8px 12px",
              marginRight: "10px",
            }}
          >
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage}
          </span>

          <button
            onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
            style={{
              padding: "8px 12px",
              marginLeft: "10px",
            }}
          >
            Next
          </button>

        </div>

      </div>

      {/* ✅ Modal */}

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

export default React.memo(Dashboard);