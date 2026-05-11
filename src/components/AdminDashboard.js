import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await fetch("http://localhost:5000/api/admin/stats", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await res.json();
    setStats(data);
  };

  if (!stats) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>Total Users: {stats.totalUsers}</div>
        <div>Total Tasks: {stats.totalTasks}</div>
        <div>Completed: {stats.completedTasks}</div>
        <div>Pending: {stats.pendingTasks}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;