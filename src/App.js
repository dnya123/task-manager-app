import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./styles.css";

function App() {

  const [page, setPage] = useState("login");

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [currentUser, setCurrentUser] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ Auto Login
  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {

    setPage("dashboard");

  } else {

    setPage("login");
  }

}, []);

  // ✅ Fetch Tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/tasks",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 401) {

  localStorage.removeItem("token");

  setPage("login");

  alert("Session Expired");
}

      const data = await response.json();

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  // ✅ Form Input Change
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ LOGIN + REGISTER
  const handleSubmit = async () => {

    let err = {};

    if (!form.email?.includes("@")) {
      err.email = "Invalid email";
    }

    if (!form.password || form.password.length < 6) {
      err.password = "Min 6 characters";
    }

    // ✅ REGISTER
    if (page === "register") {

      if (!form.name) {
        err.name = "Name required";
      }

      if (form.password !== form.confirmPassword) {
        err.confirmPassword = "Passwords do not match";
      }

      if (Object.keys(err).length === 0) {

        try {

          const response = await fetch(
            "http://localhost:5000/auth/register",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                name: form.name,
                email: form.email,
                password: form.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok) {

            alert("Registered Successfully");

            setPage("login");

          } else {

            alert(data.message);
          }

        } catch (error) {

          console.log(error);
        }
      }
    }

    // ✅ LOGIN
    if (page === "login") {

      if (Object.keys(err).length === 0) {

        try {

          const response = await fetch(
            "http://localhost:5000/auth/login",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                email: form.email,
                password: form.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok) {

            localStorage.setItem("token", data.token);

            setCurrentUser(data.user);

            setPage("dashboard");

          } else {

            alert(data.message);
          }

        } catch (error) {

          console.log(error);
        }
      }
    }

    setErrors(err);
  };

  // ✅ Add Task
  const addTask = async () => {

    if (!title || !desc) return;

    setLoading(true);

    try {

     const response = await fetch(
  "http://localhost:5000/tasks",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    body: JSON.stringify({
      title,
      description: desc,
      status: "Pending",
    }),
  }
);

if (response.status === 401) {

  localStorage.removeItem("token");

  setPage("login");

  alert("Session Expired");
}

      fetchTasks();

      setTitle("");
      setDesc("");

      setShowModal(false);

    } catch (error) {

      console.log(error);
    }

    setLoading(false);
  };

  // ✅ Delete Task
  const deleteTask = async (id) => {

    try {

      const response = await fetch(
  `http://localhost:5000/tasks/${id}`,
  {
    method: "DELETE",

    headers: {
      Authorization: localStorage.getItem("token"),
    },
  }
);

if (response.status === 401) {

  localStorage.removeItem("token");

  setPage("login");

  alert("Session Expired");
}

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // ✅ Update Task
  const updateTask = async (id) => {

    try {

     const response = await fetch(
  `http://localhost:5000/tasks/${id}`,
  {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },

    body: JSON.stringify({
      status: "Completed",
    }),
  }
);

if (response.status === 401) {

  localStorage.removeItem("token");

  setPage("login");

  alert("Session Expired");
}

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // ✅ Logout
  const logout = () => {

    localStorage.removeItem("token");

    setCurrentUser(null);

    setPage("login");
  };

  return (
    <>

      {page === "login" && (
        <Login
          setPage={setPage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}

      {page === "register" && (
        <Register
          setPage={setPage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      )}

      {page === "dashboard" &&
         localStorage.getItem("token") && (
        <Dashboard
          currentUser={currentUser}
          tasks={tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          logout={logout}
          loading={loading}
        />
      )}

    </>
  );
}

export default App;