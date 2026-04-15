import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import "./styles.css";

function App() {
  const [page, setPage] = useState("login");

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // ✅ Load users
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // ✅ Save users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // ✅ Load tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // ✅ Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //MAIN SUBMIT (LOGIN + REGISTER)
  const handleSubmit = () => {
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

      if (users.find((u) => u.email === form.email)) {
        err.email = "User already exists";
      }

      if (Object.keys(err).length === 0) {
        const newUser = {
          name: form.name,
          email: form.email,
          password: form.password,
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);

        alert("Registered successfully!");
        setPage("login");
      }
    }

    // ✅ LOGIN
    if (page === "login") {
      const user = users.find(
        (u) =>
          u.email === form.email &&
          u.password === form.password
      );

      if (!user) {
        err.email = "Invalid credentials";
      }

      if (Object.keys(err).length === 0) {
        setCurrentUser(user);
        setPage("dashboard");
      }
    }

    setErrors(err);
  };

  // ✅ Add Task
  const addTask = () => {
    if (!title || !desc) return;

    const newTasks = [...tasks, { title, desc }];
    setTasks(newTasks);

    setTitle("");
    setDesc("");
    setShowModal(false);
  };

  // ✅ Delete Task
  const deleteTask = (i) => {
    const updated = tasks.filter((_, index) => index !== i);
    setTasks(updated);
  };
    const logout = () => {
       setPage("login");
       setCurrentUser(null);
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

      {page === "dashboard" && (
        <Dashboard
          currentUser={currentUser}
          tasks={tasks}
          deleteTask={deleteTask}
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
          title={title}
          setTitle={setTitle}
          desc={desc}
          setDesc={setDesc}
          logout={logout}
        />
      )}
    </>
  );
}

export default App;